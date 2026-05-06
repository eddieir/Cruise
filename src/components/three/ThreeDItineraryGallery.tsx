import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, Float, OrbitControls } from '@react-three/drei'
import { type Port } from '@/data/itinerary'
import * as THREE from 'three'

const PORT_COLORS: Record<string, string> = {
  ocean: '#0ea5e9',
  blue: '#3b82f6',
  orange: '#f97316',
  purple: '#a855f7',
  cyan: '#06b6d4',
  green: '#22c55e',
  red: '#ef4444'
}

function PortCard({ port, index, total, onClick, selected }: {
  port: Port; index: number; total: number; onClick: () => void; selected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const angle = (index / total) * Math.PI * 2
  const radius = 3.5
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const color = PORT_COLORS[port.color] || '#0ea5e9'

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3 + index) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[x, 0, z]} onClick={onClick}>
        <RoundedBox
          ref={meshRef}
          args={[1.6, 2.2, 0.12]}
          radius={0.12}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            transparent
            opacity={selected ? 0.95 : 0.75}
            roughness={0.1}
            metalness={0.2}
          />
        </RoundedBox>

        {/* Day number */}
        <Text
          position={[0, 0.75, 0.07]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {port.emoji}
        </Text>

        <Text
          position={[0, 0.35, 0.07]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {`Day ${port.day}`}
        </Text>

        <Text
          position={[0, 0.08, 0.07]}
          fontSize={0.14}
          color="rgba(255,255,255,0.9)"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {port.port}
        </Text>

        <Text
          position={[0, -0.18, 0.07]}
          fontSize={0.1}
          color="rgba(255,255,255,0.65)"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {port.date}
        </Text>

        <Text
          position={[0, -0.45, 0.07]}
          fontSize={0.1}
          color="rgba(255,255,255,0.5)"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {port.budgetTarget}
        </Text>

        {selected && (
          <RoundedBox args={[1.68, 2.28, 0.1]} radius={0.12} smoothness={4}>
            <meshStandardMaterial color={color} transparent opacity={0.15} />
          </RoundedBox>
        )}
      </group>
    </Float>
  )
}

function Scene({ ports, selectedIdx, setSelectedIdx }: {
  ports: Port[]
  selectedIdx: number
  setSelectedIdx: (i: number) => void
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 8, 5]} intensity={1.5} color="#7dd3fc" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#818cf8" />

      {ports.map((port, i) => (
        <PortCard
          key={port.day}
          port={port}
          index={i}
          total={ports.length}
          onClick={() => setSelectedIdx(i)}
          selected={i === selectedIdx}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  )
}

function FallbackGallery({ ports, selectedIdx, setSelectedIdx }: {
  ports: Port[]; selectedIdx: number; setSelectedIdx: (i: number) => void
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
      {ports.map((port, i) => (
        <button
          key={port.day}
          onClick={() => setSelectedIdx(i)}
          className={`snap-center shrink-0 w-36 rounded-2xl p-3 text-left transition-all border ${
            i === selectedIdx ? 'border-sky-500 bg-sky-500/15' : 'border-white/10 bg-white/5'
          }`}
        >
          <div className="text-2xl mb-1">{port.emoji}</div>
          <div className="text-xs font-semibold text-white">Day {port.day} — {port.port}</div>
          <div className="text-[10px] text-white/50 mt-1">{port.date}</div>
        </button>
      ))}
    </div>
  )
}

interface ThreeDItineraryGalleryProps {
  ports: Port[]
}

export function ThreeDItineraryGallery({ ports }: ThreeDItineraryGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [webGLSupported] = useState(() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch {
      return false
    }
  })

  const selected = ports[selectedIdx]

  return (
    <div className="space-y-4">
      {webGLSupported ? (
        <div className="h-72 md:h-96 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
          <Suspense fallback={
            <div className="h-full flex items-center justify-center text-white/40 text-sm">
              Loading 3D view…
            </div>
          }>
            <Canvas camera={{ position: [0, 2, 7], fov: 55 }}>
              <Scene ports={ports} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
            </Canvas>
          </Suspense>
        </div>
      ) : (
        <FallbackGallery ports={ports} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      )}

      {/* Selected port detail */}
      {selected && (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{selected.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-lg text-white">{selected.port}</h3>
                <span className="text-sm text-white/50">{selected.date} · {selected.dayLabel}</span>
              </div>
              {selected.arrival !== '—' && (
                <p className="text-xs text-white/50 mt-0.5">
                  {selected.arrival} – {selected.departure}
                </p>
              )}
              <p className="text-sm text-sky-400 font-medium mt-1">Budget target: {selected.budgetTarget}</p>
              <p className="text-sm text-white/70 mt-1">{selected.foodTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dot navigation */}
      <div className="flex justify-center gap-1.5">
        {ports.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selectedIdx ? 'bg-sky-400 w-6' : 'bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
