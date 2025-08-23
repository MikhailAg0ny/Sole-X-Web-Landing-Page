import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, ContactShadows } from '@react-three/drei'
import styles from './ModelCanvas.module.css'
import Loader from './Loader'

function ShoeModel({ url, rotation = [0, Math.PI, 0], scale = 1, spin = true, spinSpeed = 0.3 }) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(true), [scene])
  const groupRef = useRef()

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
    <group ref={groupRef} scale={scale}>
      <primitive object={model} dispose={null} />
    </group>
  )
}

export default function ModelCanvas({
  modelUrl = '/models/nike_air_zoom_pegasus_36.optim.glb',
  autoRotate = false,
  rearView = true,
  scale = 0.8,
  spin = true,
  spinSpeed = 0.25,
}) {
  const rotation = rearView ? [0, Math.PI, 0] : [0, 0, 0] // rear side view by default
  return (
    <div className={styles.wrapper}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [1.9, 0.3, 3], fov: 20 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>          
          <group position={[0, -0.1, 0]}>
            <ShoeModel url={modelUrl} rotation={rotation} scale={scale} spin={spin} spinSpeed={spinSpeed} />
            <ContactShadows position={[0, -0.55, 0]} opacity={0.3} scale={4.5} blur={2} far={2} />
          </group>
          <Environment preset="city" />
        </Suspense>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
useGLTF.preload('/models/nike_air_zoom_pegasus_36.optim.glb')
