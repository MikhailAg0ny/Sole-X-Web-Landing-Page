import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: 'var(--color-fg)', fontFamily: 'system-ui', fontSize: 14 }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  )
}
