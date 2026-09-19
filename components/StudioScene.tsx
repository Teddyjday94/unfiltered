"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { motionEnabled: boolean };

function LightRig({ motionEnabled }: SceneProps) {
  const key = useRef<THREE.SpotLight>(null);
  const fill = useRef<THREE.SpotLight>(null);
  const accent = useRef<THREE.PointLight>(null);

  useFrame(({ clock, pointer }) => {
    if (!motionEnabled) return;
    const t = clock.elapsedTime;
    if (key.current) {
      key.current.position.x = -3.1 + pointer.x * 0.35;
      key.current.intensity = 78 + Math.sin(t * 0.42) * 3;
    }
    if (fill.current) {
      fill.current.position.x = 3 + pointer.x * 0.28;
      fill.current.intensity = 46 + Math.sin(t * 0.5 + 1.3) * 2;
    }
    if (accent.current) accent.current.intensity = 18 + Math.sin(t * 0.68) * 1.5;
  });

  return (
    <>
      <ambientLight intensity={1.05} />
      <spotLight ref={key} position={[-3.1, 4.3, 3]} color="#ffd68a" intensity={78} angle={0.48} penumbra={0.88} distance={11} />
      <spotLight ref={fill} position={[3, 3.4, 2.8]} color="#83c8df" intensity={46} angle={0.54} penumbra={0.92} distance={10} />
      <pointLight ref={accent} position={[0.6, 1.15, -0.8]} color="#ff765d" intensity={18} distance={5} />
      <pointLight position={[-2.2, 0.8, -0.55]} color="#62b8a7" intensity={9} distance={4} />
    </>
  );
}

function CameraRig({ motionEnabled }: SceneProps) {
  const { camera, pointer } = useThree();
  const smoothScroll = useRef(0);

  useFrame(() => {
    const rawScroll = typeof window === "undefined" ? 0 : Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, motionEnabled ? rawScroll : 0, 0.04);
    const scroll = smoothScroll.current;
    const tx = motionEnabled ? pointer.x * 0.34 : 0;
    const ty = motionEnabled ? pointer.y * 0.16 : 0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + scroll * 0.08, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.18 + ty - scroll * 0.16, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.35 - scroll * 0.62, 0.04);
    camera.lookAt(pointer.x * 0.05, 0.02 - scroll * 0.06, -0.35);
  });
  return null;
}

function WoodWall() {
  const slats = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  return (
    <group position={[0, 0.15, -2.68]}>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[9.2, 5.2, 0.18]} />
        <meshStandardMaterial color="#67422f" roughness={0.93} />
      </mesh>
      {slats.map((i) => (
        <mesh key={i} position={[(i - 8.5) * 0.48, 0, 0]}>
          <boxGeometry args={[0.37, 4.9, 0.09]} />
          <meshStandardMaterial color={i % 3 === 0 ? "#9b6645" : i % 2 ? "#82543b" : "#74482f"} roughness={0.84} />
        </mesh>
      ))}
      {[-2.35, 2.35].map((x) => (
        <mesh key={x} position={[x, 0, 0.085]}>
          <boxGeometry args={[0.055, 4.9, 0.035]} />
          <meshStandardMaterial color="#b77b50" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Sign() {
  return (
    <group position={[0, 1.32, -2.16]}>
      <RoundedBox args={[3.8, 0.9, 0.12]} radius={0.055} smoothness={3}>
        <meshStandardMaterial color="#241d19" metalness={0.18} roughness={0.34} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[3.48, 0.56, 0.035]} />
        <meshBasicMaterial color="#fff0b4" transparent opacity={0.62} />
      </mesh>
      <mesh position={[0, 0, 0.105]}>
        <boxGeometry args={[2.72, 0.13, 0.012]} />
        <meshBasicMaterial color="#fff9df" transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

function Chair({ x, ry }: { x: number; ry: number }) {
  const ribXs = [-0.38, -0.19, 0, 0.19, 0.38];
  return (
    <group position={[x, -0.72, -0.72]} rotation={[0, ry, 0]}>
      <RoundedBox args={[1.36, 1.2, 0.3]} radius={0.11} smoothness={3} position={[0, 0.45, -0.36]} rotation={[-0.09, 0, 0]}>
        <meshStandardMaterial color="#a76a3e" roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[1.16, 0.98, 0.22]} radius={0.1} smoothness={3} position={[0, 0.43, -0.17]} rotation={[-0.09, 0, 0]}>
        <meshStandardMaterial color="#c78b53" roughness={0.9} />
      </RoundedBox>
      {ribXs.map((sx, i) => (
        <mesh key={i} position={[sx, 0.43, -0.045]} rotation={[-0.09, 0, 0]}>
          <boxGeometry args={[0.035, 0.82, 0.018]} />
          <meshBasicMaterial color={i % 2 ? "#e3bd72" : "#70a9b7"} transparent opacity={0.68} />
        </mesh>
      ))}
      <RoundedBox args={[1.18, 0.22, 1.03]} radius={0.08} smoothness={3} position={[0, -0.25, 0.02]}>
        <meshStandardMaterial color="#835139" roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[1.08, 0.19, 0.9]} radius={0.08} smoothness={3} position={[0, -0.12, 0.08]}>
        <meshStandardMaterial color="#c48a57" roughness={0.9} />
      </RoundedBox>
      {[-0.67, 0.67].map((ax) => (
        <group key={ax}>
          <RoundedBox args={[0.18, 0.5, 0.95]} radius={0.07} smoothness={3} position={[ax, -0.04, 0]}>
            <meshStandardMaterial color="#9b603e" roughness={0.84} />
          </RoundedBox>
          <mesh position={[ax, -0.64, 0.33]} rotation={[0.1, 0, ax > 0 ? -0.05 : 0.05]}>
            <boxGeometry args={[0.1, 0.7, 0.1]} />
            <meshStandardMaterial color="#4c3529" roughness={0.72} />
          </mesh>
          <mesh position={[ax, -0.64, -0.27]} rotation={[-0.08, 0, ax > 0 ? -0.05 : 0.05]}>
            <boxGeometry args={[0.1, 0.7, 0.1]} />
            <meshStandardMaterial color="#4c3529" roughness={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Fireplace() {
  return (
    <group position={[-2.52, -0.52, -1.73]}>
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[1.45, 1.74, 0.34]} />
        <meshStandardMaterial color="#3b2d27" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.9, 0.12]}>
        <boxGeometry args={[1.68, 0.16, 0.48]} />
        <meshStandardMaterial color="#6b4a37" roughness={0.74} />
      </mesh>
      <mesh position={[0, 0.05, 0.2]}>
        <boxGeometry args={[1.02, 0.84, 0.06]} />
        <meshStandardMaterial color="#1c1714" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.02, 0.245]}>
        <planeGeometry args={[0.82, 0.58]} />
        <meshBasicMaterial color="#ff7246" transparent opacity={0.34} />
      </mesh>
      {[-0.23, 0.02, 0.25].map((lx, i) => (
        <mesh key={i} position={[lx, -0.16 + i * 0.025, 0.29]} rotation={[0, 0, i % 2 ? -0.18 : 0.18]}>
          <cylinderGeometry args={[0.055, 0.065, 0.52, 10]} />
          <meshStandardMaterial color="#5b3726" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function SideTable({ x }: { x: number }) {
  return (
    <group position={[x, -0.93, -0.28]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.085, 32]} />
        <meshStandardMaterial color="#6a452f" roughness={0.58} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 0.8, 14]} />
        <meshStandardMaterial color="#2f2925" metalness={0.68} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.28, 0.34, 0.06, 28]} />
        <meshStandardMaterial color="#342c27" metalness={0.45} roughness={0.36} />
      </mesh>
      <mesh position={[0.06, 0.34, 0]}>
        <cylinderGeometry args={[0.09, 0.085, 0.34, 18]} />
        <meshStandardMaterial color="#d6d9d0" metalness={0.22} roughness={0.34} />
      </mesh>
    </group>
  );
}

function StudioSet() {
  return (
    <group>
      <Fireplace />
      <Chair x={-1.16} ry={0.13} />
      <Chair x={1.16} ry={-0.13} />
      <SideTable x={0} />
    </group>
  );
}

function StudioDetails() {
  const Plant = ({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) => (
    <group position={[x, -0.86, z]} scale={scale}>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.38, 18]} />
        <meshStandardMaterial color="#c9684d" roughness={0.72} />
      </mesh>
      {[-0.17, 0, 0.17].map((dx, i) => (
        <mesh key={i} position={[dx, 0.2 + i * 0.06, 0]} scale={[0.45, 1, 0.35]} rotation={[0, 0, dx * 1.9]}>
          <sphereGeometry args={[0.32, 18, 14]} />
          <meshStandardMaterial color={i === 1 ? "#347361" : "#4b8c73"} roughness={0.82} />
        </mesh>
      ))}
    </group>
  );

  return (
    <group>
      <mesh position={[0, -1.48, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial color="#d8c2a6" roughness={0.98} />
      </mesh>
      <mesh position={[0.28, -1.465, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.62, 52]} />
        <meshStandardMaterial color="#d99e55" roughness={0.96} />
      </mesh>
      <mesh position={[0.28, -1.455, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.68, 1.48, 52]} />
        <meshBasicMaterial color="#e0c76d" transparent opacity={0.58} />
      </mesh>
      <Plant x={-3.08} z={-1.26} scale={1.04} />
      <Plant x={3.05} z={-1.4} scale={0.9} />
      <group position={[2.72, 0.93, -2.3]} rotation={[0, 0, -0.06]}>
        <mesh><boxGeometry args={[0.78, 1.02, 0.08]} /><meshStandardMaterial color="#4b92ae" roughness={0.55} /></mesh>
        <mesh position={[0, 0, 0.048]}><boxGeometry args={[0.6, 0.84, 0.025]} /><meshStandardMaterial color="#f0d584" roughness={0.7} /></mesh>
      </group>
    </group>
  );
}

function Microphone({ x = 0, mirror = false, motionEnabled }: { x?: number; mirror?: boolean; motionEnabled: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.z = motionEnabled ? Math.sin(t * 0.65 + x) * 0.018 + (mirror ? -0.16 : 0.16) : (mirror ? -0.16 : 0.16);
  });

  return (
    <group ref={group} position={[x, -0.03, 0.18]}>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[mirror ? 1.08 : -1.08, 0.68, -0.1]}>
        <cylinderGeometry args={[0.035, 0.035, 2.08, 16]} />
        <meshStandardMaterial color="#282828" metalness={0.82} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <capsuleGeometry args={[0.18, 0.48, 8, 16]} />
        <meshStandardMaterial color="#151515" metalness={0.86} roughness={0.24} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.68, 14]} />
        <meshStandardMaterial color="#242424" metalness={0.8} roughness={0.28} />
      </mesh>
    </group>
  );
}

function Dust({ motionEnabled }: SceneProps) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 70;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      p[i * 3] = (Math.random() - 0.5) * 7;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (points.current && motionEnabled) points.current.rotation.y = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#f3c28c" size={0.014} transparent opacity={0.28} sizeAttenuation />
    </points>
  );
}

function Equalizer({ motionEnabled }: SceneProps) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    refs.current.forEach((bar, i) => {
      if (!bar) return;
      const h = motionEnabled ? 0.16 + (Math.sin(clock.elapsedTime * (1.8 + i * 0.1) + i) + 1) * 0.08 : 0.2;
      bar.scale.y = h / 0.2;
    });
  });

  return (
    <group position={[0, -1.39, -0.8]}>
      {Array.from({ length: 17 }, (_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[(i - 8) * 0.18, 0, 0]}>
          <boxGeometry args={[0.07, 0.2, 0.04]} />
          <meshBasicMaterial color={i > 12 ? "#e65c47" : "#e5ae59"} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

export default function StudioScene({ motionEnabled }: SceneProps) {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0.18, 5.35], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#eee4d6"]} />
      <fog attach="fog" args={["#eee4d6", 6.6, 11]} />
      <LightRig motionEnabled={motionEnabled} />
      <StudioDetails />
      <WoodWall />
      <Sign />
      <StudioSet />
      <Microphone x={-0.88} motionEnabled={motionEnabled} />
      <Microphone x={0.88} mirror motionEnabled={motionEnabled} />
      <Equalizer motionEnabled={motionEnabled} />
      <Dust motionEnabled={motionEnabled} />
      <CameraRig motionEnabled={motionEnabled} />
    </Canvas>
  );
}
