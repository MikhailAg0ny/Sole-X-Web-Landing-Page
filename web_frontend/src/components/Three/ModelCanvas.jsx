import { Suspense, useEffect, useMemo, useRef } from 'react'
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
  const groupRef = useRef()
  const baseScale = useRef(1)

  useEffect(() => {
    // Normalize model size to a consistent visual scale
    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const target = 2.2 // matches hero area visually
    baseScale.current = target / maxDim

    // Center model on X/Z and place bottom on y=0 for consistent grounding
    const center = new THREE.Vector3()
    box.getCenter(center)
    model.position.set(-center.x, -box.min.y, -center.z)
  }, [model])

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
    }
  }, [rotation])

  useFrame((_, delta) => {
    if (spin && groupRef.current) {
      groupRef.current.rotation.y += delta * spinSpeed
    }
  })

  return (
    <group ref={groupRef} scale={scale * baseScale.current}>
      <primitive object={model} dispose={null} />
    </group>
  )
}

export default function ModelCanvas({ modelUrl = '/models/nike_air_zoom_pegasus_36.optim.glb', rearView = true, scale = 1.5, spin = true, spinSpeed = 0.3 }) {
  // Preload the model for faster mount
  useEffect(() => { try { useGLTF.preload(modelUrl) } catch {} }, [modelUrl])

  return (
    <div className={styles.wrapper}>
      <Canvas shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 6, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <ShoeModel url={modelUrl} rotation={rearView ? [0, Math.PI, 0] : [0, 0, 0]} scale={scale} spin={spin} spinSpeed={spinSpeed} />
          <ContactShadows position={[0, -0.001, 0]} opacity={0.35} blur={2.8} scale={10} far={8} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
    </div>
  )
}
