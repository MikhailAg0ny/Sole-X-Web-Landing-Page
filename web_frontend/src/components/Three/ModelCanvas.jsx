import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { MeshoptDecoder } from 'three-stdlib'
import * as THREE from 'three'
import styles from './ModelCanvas.module.css'
import Loader from './Loader'

// Ensure Meshopt-compressed models decode correctly
try { useGLTF.setMeshoptDecoder(MeshoptDecoder) } catch {}

function ShoeModel({ url, rotation = [0, Math.PI, 0], scale = 1, spin = true, spinSpeed = 0.3 }) {
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

  // Handle resize and visibility changes to maintain positioning
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render of the canvas to fix positioning issues
      window.dispatchEvent(new Event('resize'))
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Small delay to ensure DOM is ready after alt-tab
        setTimeout(handleResize, 100)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
  <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 2]}
        camera={{ position: [0, 2, 5], fov: 45 }}
        onCreated={({ gl, camera }) => {
          // Ensure proper camera setup
          gl.setClearColor(0x000000, 0)
          camera.position.set(0, 2, 5)
        }}
      >
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
          <group position={offset}>
            <ShoeModel url={modelUrl} rotation={rotation ?? (rearView ? [0, Math.PI, 0] : [0, 0, 0])} scale={scale} spin={spin} spinSpeed={spinSpeed} />
          </group>
          <ContactShadows position={[0, (offset?.[1] || 0) - 0.001, 0]} opacity={0.35} blur={2.8} scale={10} far={8} />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
            target={[0, targetY, 0]}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />
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
