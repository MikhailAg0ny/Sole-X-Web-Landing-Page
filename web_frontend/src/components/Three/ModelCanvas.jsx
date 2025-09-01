import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { MeshoptDecoder } from 'three-stdlib'
import * as THREE from 'three'
import styles from './ModelCanvas.module.css'
import Loader from './Loader'

// Ensure Meshopt-compressed models decode correctly
try { useGLTF.setMeshoptDecoder(MeshoptDecoder) } catch {}

function ShoeModel({ url, rotation = [0, Math.PI, 0], scale = 1, spin = true, spinSpeed = 0.3, onReady }) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(true), [scene])
  const outerRef = useRef() // spins around Y
  const innerRef = useRef() // holds model and tilt rotation
  const baseScale = useRef(1)
  const [isPositioned, setIsPositioned] = useState(false)
  
  useEffect(() => {
    // Normalize model size to a consistent visual scale
    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const target = 3 // slightly larger to better fill hero area
    baseScale.current = target / maxDim

    // Center model on X/Z and place bottom on y=0 for consistent grounding
    const center = new THREE.Vector3()
    box.getCenter(center)
    model.position.set(-center.x, -box.min.y, -center.z)
  setIsPositioned(true)
  }, [model])

  useEffect(() => {
    if (!innerRef.current) return
    // Apply static tilt to inner group
    innerRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
  // After rotation, re-ground Y so minY sits at y=0 (keep X/Z center unchanged)
  const box = new THREE.Box3().setFromObject(innerRef.current)
  innerRef.current.position.y -= box.min.y
    setIsPositioned(true)
  }, [rotation])


  // One-shot re-ground after first frame to avoid any late material/decoder updates shifting bounds
  useFrame(() => {
    if (!innerRef.current || !isPositioned) return
    const box = new THREE.Box3().setFromObject(innerRef.current)
    if (Math.abs(box.min.y) > 1e-3) {
      innerRef.current.position.y -= box.min.y
    }
  })

  useFrame((_, delta) => {
    if (spin && outerRef.current) {
      outerRef.current.rotation.y += delta * spinSpeed
    }
  })
  

  return (
    <group ref={outerRef} scale={scale * baseScale.current}>
      <group ref={innerRef}>
        <primitive object={model} dispose={null} />
      </group>
    </group>
  )
}

export default function ModelCanvas({ modelUrl = '/models/nike_air_zoom_pegasus_36.optim.glb', rearView = true, rotation, offset = [0,0,0], scale = 1, spin = true, spinSpeed = 0.3, targetY = 0.75 }) {
  // Preload the model for faster mount
  useEffect(() => { try { useGLTF.preload(modelUrl) } catch {} }, [modelUrl])

  // In-canvas visibility refresh: reset size/DPR, update camera, and re-render a few frames
  function VisibilityRefresh({ dpr }) {
    const { gl, size, setSize, invalidate, camera } = useThree()
    useEffect(() => {
      const refresh = () => {
        if (document.hidden) return
        try {
          // Re-apply size and DPR
          setSize(size.width, size.height)
          const maxDpr = Array.isArray(dpr) ? dpr[1] : dpr
          if (maxDpr) gl.setPixelRatio(maxDpr)
          camera.updateProjectionMatrix()
          // Kick a few frames to ensure materials/shadows settle
          let n = 3
          const tick = () => { invalidate(); if (--n > 0) requestAnimationFrame(tick) }
          tick()
        } catch {}
      }
      document.addEventListener('visibilitychange', refresh)
      window.addEventListener('focus', refresh)
      return () => {
        document.removeEventListener('visibilitychange', refresh)
        window.removeEventListener('focus', refresh)
      }
    }, [gl, size, setSize, invalidate, camera, dpr])
    return null
  }

  const mqSmall = typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false
  const mqShort = typeof window !== 'undefined' ? window.matchMedia('(max-height: 640px)').matches : false
  const mqTiny = typeof window !== 'undefined' ? window.matchMedia('(max-height: 520px)').matches : false
  const fov = mqSmall ? (mqTiny ? 64 : mqShort ? 60 : 54) : 45
  const dpr = mqSmall ? [1, mqTiny ? 1.2 : mqShort ? 1.35 : 1.5] : [1, 2]

  const modelGroupRef = useRef()
  const controlsRef = useRef()
  const [fitTarget, setFitTarget] = useState(null)
  const [dragging, setDragging] = useState(false)
  // Desktop-only tilt parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const rafRef = useRef()

  return (
    <div
      className={styles.wrapper}
      onMouseMove={(e) => {
        // Parallax tilt (pointer: fine)
        if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return
        const r = e.currentTarget.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (e.clientX - cx) / (r.width / 2)
        const dy = (e.clientY - cy) / (r.height / 2)
        const max = 6 // degrees
        const next = { x: -dy * max, y: dx * max }
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => setTilt(next))
      }}
      onMouseLeave={() => {
        cancelAnimationFrame(rafRef.current)
        setTilt({ x: 0, y: 0 })
      }}
      style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)` }}
    >
  <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true }} 
        dpr={dpr}
        camera={{ position: mqTiny ? [0, 2.5, 6.2] : mqShort ? [0, 2.3, 5.8] : [0, 2, 5], fov }}
        onCreated={({ gl, camera }) => {
          // Ensure proper camera setup
          gl.setClearColor(0x000000, 0)
          const pos = mqTiny ? [0, 2.5, 6.2] : mqShort ? [0, 2.3, 5.8] : [0, 2, 5]
          camera.position.set(pos[0], pos[1], pos[2])
        }}
      >
        <VisibilityRefresh dpr={dpr} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 6, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <spotLight
            position={[-3, 7, 4]}
            angle={0.6}
            penumbra={0.5}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <group ref={modelGroupRef} position={offset}>
            <ShoeModel
              url={modelUrl}
              rotation={rotation ?? (rearView ? [0, Math.PI, 0] : [0, 0, 0])}
              scale={scale}
              spin={spin && !dragging}
              spinSpeed={spinSpeed}
              onReady={(obj) => setFitTarget(obj)}
            />
          </group>
          <ContactShadows position={[0, (offset?.[1] || 0) - 0.001, 0]} opacity={0.35} blur={2.8} scale={10} far={8} />
          <Environment preset="city" />
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
            target={[0, Math.max(0.45, Math.min(0.85, targetY)), 0]}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            onStart={() => setDragging(true)}
            onEnd={() => setDragging(false)}
          />
          {fitTarget ? (
            <FitCamera
              target={fitTarget}
              controls={controlsRef.current}
              margin={mqSmall ? 1.25 : 1.15}
              targetYPreferred={targetY}
            />
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  )
}

function Model({ url, scale, rotation, offset }) {
  const { nodes } = useGLTF(url)
  const groupRef = useRef()
  const innerRef = useRef()

  useLayoutEffect(() => {
    if (!innerRef.current) return
    // Center the model on all axes to prevent it from floating too high or low.
    const box = new THREE.Box3().setFromObject(innerRef.current)
    const center = new THREE.Vector3()
    box.getCenter(center)
    innerRef.current.position.sub(center)
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the group for a simple spin animation
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef} position={offset} rotation={rotation} scale={scale}>
      <mesh ref={innerRef} geometry={nodes.Cube.geometry} material={nodes.Cube.material} />
    </group>
  )
}

// Utility to fit the camera to the target object's bounds (height and width) with margin
function FitCamera({ target, controls, margin = 1.15, targetYPreferred = 0.75 }) {
  const { camera, size, invalidate } = useThree()
  const frames = useRef(0)

  useFrame(() => {
    if (!target || frames.current > 24) return
    const box = new THREE.Box3().setFromObject(target)
    applyFit(box)
    frames.current += 1
  })

  useEffect(() => {
    if (!target) return
    const box = new THREE.Box3().setFromObject(target)
    applyFit(box)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, size.width, size.height, margin, controls, targetYPreferred])

  function applyFit(box) {
    const center = new THREE.Vector3(); box.getCenter(center)
    const sizeV = new THREE.Vector3(); box.getSize(sizeV)
    const vert = sizeV.y * margin
    const horiz = sizeV.x * margin
    const fovRad = (camera.fov * Math.PI) / 180
    const aspect = size.width / Math.max(1, size.height)
    const vDist = (vert / 2) / Math.tan(fovRad / 2)
    const hFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect)
    const hDist = (horiz / 2) / Math.tan(hFov / 2)
    const dist = Math.max(vDist, hDist)
    camera.position.x = center.x
    camera.position.z = center.z + dist
    const tY = Math.max(0.45, Math.min(0.85, targetYPreferred))
    if (controls?.target) {
      controls.target.set(center.x, tY, center.z)
      controls.update()
    } else {
      camera.lookAt(center.x, tY, center.z)
    }
    camera.updateProjectionMatrix()
    invalidate()
  }

  return null
}
