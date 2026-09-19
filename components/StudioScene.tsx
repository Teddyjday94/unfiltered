"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { motionEnabled: boolean };

function CameraRig({ motionEnabled }: SceneProps) {
  const { camera, pointer } = useThree();
  const smoothScroll = useRef(0);

  useFrame(() => {
    const rawScroll = typeof window === "undefined"
      ? 0
      : Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
    smoothScroll.current = THREE.MathUtils.lerp(
      smoothScroll.current,
      motionEnabled ? rawScroll : 0,
      0.045
    );

    const scroll = smoothScroll.current;
    const tx = motionEnabled ? pointer.x * 0.42 : 0;
    const ty = motionEnabled ? pointer.y * 0.2 : 0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + scroll * 0.1, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 + ty - scroll * 0.22, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.2 - scroll * 0.72, 0.04);
    camera.lookAt(pointer.x * 0.08, 0.1 - scroll * 0.08, -scroll * 0.22);
  });

  return null;
}

function WoodWall() {
  const slats = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []);
  return (
    <group position={[0, 0.2, -2.55]}>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[8.5, 5, 0.18]} />
        <meshStandardMaterial color="#0b0908" roughness={0.9} />
      </mesh>
      {slats.map((i) => (
        <mesh key={i} position={[(i - 7) * 0.48, 0, 0]}>
          <boxGeometry args={[0.31, 4.65, 0.23]} />
          <meshStandardMaterial color={i % 2 ? "#3a2116" : "#29160f"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Sign() {
  return (
    <group position={[0, 1.23, -1.82]}>
      <RoundedBox args={[3.55, 0.84, 0.11]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#160d09" metalness={0.15} roughness={0.45} />
      </RoundedBox>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[3.15, 0.44]} />
        <meshBasicMaterial color="#ff6b2c" transparent opacity={0.13} />
      </mesh>
    </group>
  );
}

function Microphone({ x = 0, mirror = false, motionEnabled }: { x?: number; mirror?: boolean; motionEnabled: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.z = motionEnabled ? Math.sin(t * 0.72 + x) * 0.035 + (mirror ? -0.18 : 0.18) : (mirror ? -0.18 : 0.18);
    group.current.position.y = motionEnabled ? Math.sin(t * 0.9 + x * 2) * 0.035 : 0;
  });

  return (
    <group ref={group} position={[x, -0.1, 0.2]}>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[mirror ? 1.15 : -1.15, 0.75, -0.1]}>
        <cylinderGeometry args={[0.045, 0.045, 2.25, 20]} />
        <meshStandardMaterial color="#242424" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 10, 22]} />
        <meshStandardMaterial color="#111111" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.72, 0.27]}>
        <boxGeometry args={[0.38, 0.52, 0.06]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.78} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.045, 0.08, 0.74, 18]} />
        <meshStandardMaterial color="#191919" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 40]} />
        <meshStandardMaterial color="#141414" metalness={0.82} roughness={0.28} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, -1.03, 0]}>
      <RoundedBox args={[5.5, 0.22, 1.55]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#28150f" roughness={0.62} metalness={0.08} />
      </RoundedBox>
      <mesh position={[-1.65, 0.18, 0.34]} rotation={[-0.12, 0, 0.04]}>
        <boxGeometry args={[0.95, 0.08, 0.68]} />
        <meshStandardMaterial color="#0f1112" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[1.55, 0.18, 0.2]}>
        <cylinderGeometry args={[0.22, 0.18, 0.45, 28]} />
        <meshStandardMaterial color="#f0eadf" roughness={0.7} />
      </mesh>
      <mesh position={[1.78, 0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.04, 10, 22, Math.PI]} />
        <meshStandardMaterial color="#f0eadf" roughness={0.7} />
      </mesh>
    </group>
  );
}


function RetroSet() {
  const stripeXs = [-0.34, -0.17, 0, 0.17, 0.34];
  const Chair = ({ x, ry }: { x: number; ry: number }) => (
    <group position={[x, -0.65, -0.75]} rotation={[0, ry, 0]}>
      <RoundedBox args={[1.48, 1.38, 1.22]} radius={0.26} smoothness={4} position={[0, 0.18, 0]}>
        <meshStandardMaterial color="#704329" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[1.34, 0.72, 1.34]} radius={0.23} smoothness={4} position={[0, -0.48, 0.1]}>
        <meshStandardMaterial color="#613924" roughness={0.92} />
      </RoundedBox>
      {stripeXs.map((sx, i) => <mesh key={i} position={[sx, 0.18, 0.62]}><boxGeometry args={[0.055, 0.98, 0.025]} /><meshBasicMaterial color="#aa7448" transparent opacity={0.58} /></mesh>)}
    </group>
  );
  return (
    <group>
      <group position={[-2.45, -0.52, -1.55]}>
        <RoundedBox args={[1.2, 1.5, 0.38]} radius={0.08} smoothness={4}><meshStandardMaterial color="#17120f" roughness={0.7} metalness={0.18} /></RoundedBox>
        <mesh position={[0, -0.12, 0.21]}><planeGeometry args={[0.86, 0.68]} /><meshBasicMaterial color="#ef6f31" transparent opacity={0.28} /></mesh>
      </group>
      <Chair x={-1.15} ry={0.16} />
      <Chair x={1.15} ry={-0.16} />
      <group position={[0, -1.0, -0.24]}>
        <mesh><cylinderGeometry args={[0.4, 0.4, 0.08, 28]} /><meshStandardMaterial color="#684026" roughness={0.6} /></mesh>
        <mesh position={[0, -0.45, 0]}><cylinderGeometry args={[0.055, 0.085, 0.84, 14]} /><meshStandardMaterial color="#2b2019" metalness={0.6} roughness={0.3} /></mesh>
        <mesh position={[0.08, 0.25, 0]}><cylinderGeometry args={[0.09, 0.09, 0.38, 16]} /><meshStandardMaterial color="#d6d8d0" metalness={0.25} roughness={0.32} /></mesh>
      </group>
    </group>
  );
}

function Dust({ motionEnabled }: SceneProps) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 120;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      p[i * 3] = (Math.random() - 0.5) * 7;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (points.current && motionEnabled) points.current.rotation.y = clock.elapsedTime * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f5c28d" size={0.018} transparent opacity={0.34} sizeAttenuation />
    </points>
  );
}

function Equalizer({ motionEnabled }: SceneProps) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    refs.current.forEach((bar, i) => {
      if (!bar) return;
      const h = motionEnabled ? 0.18 + (Math.sin(clock.elapsedTime * (2.1 + i * 0.12) + i) + 1) * 0.12 : 0.24;
      bar.scale.y = h / 0.24;
    });
  });

  return (
    <group position={[0, -1.38, -0.75]}>
      {Array.from({ length: 19 }, (_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[(i - 9) * 0.18, 0, 0]}>
          <boxGeometry args={[0.08, 0.24, 0.06]} />
          <meshBasicMaterial color={i > 13 ? "#ff5e3a" : "#f0b46b"} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export default function StudioScene({ motionEnabled }: SceneProps) {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0.15, 5.2], fov: 43 }} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#080706"]} />
      <fog attach="fog" args={["#080706", 5.2, 9.2]} />
      <ambientLight intensity={0.55} />
      <spotLight position={[-3.4, 3.6, 3]} color="#ffb165" intensity={60} angle={0.42} penumbra={0.8} distance={10} />
      <spotLight position={[3.2, 2.8, 2.4]} color="#d14b2d" intensity={32} angle={0.5} penumbra={0.9} distance={9} />
      <pointLight position={[0, 1.2, -1.1]} color="#ff7b39" intensity={10} distance={4} />
      <WoodWall />
      <Sign />
      <RetroSet />
      <Float speed={motionEnabled ? 1.2 : 0} rotationIntensity={0.05} floatIntensity={motionEnabled ? 0.1 : 0}>
        <Microphone x={-0.88} motionEnabled={motionEnabled} />
        <Microphone x={0.88} mirror motionEnabled={motionEnabled} />
      </Float>
      <Equalizer motionEnabled={motionEnabled} />
      <Dust motionEnabled={motionEnabled} />
      <CameraRig motionEnabled={motionEnabled} />
    </Canvas>
  );
}
