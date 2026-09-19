"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
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
      key.current.position.x = -3.2 + pointer.x * 0.45;
      key.current.intensity = 82 + Math.sin(t * 0.42) * 4;
    }
    if (fill.current) {
      fill.current.position.x = 3.1 + pointer.x * 0.3;
      fill.current.intensity = 52 + Math.sin(t * 0.5 + 1.3) * 3;
    }
    if (accent.current) {
      accent.current.position.y = 1.1 + pointer.y * 0.3;
      accent.current.intensity = 20 + Math.sin(t * 0.68) * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <spotLight ref={key} position={[-3.2, 4.2, 3.2]} color="#ffd878" intensity={82} angle={0.5} penumbra={0.88} distance={11} />
      <spotLight ref={fill} position={[3.1, 3.5, 2.7]} color="#63bce3" intensity={52} angle={0.56} penumbra={0.92} distance={10} />
      <pointLight ref={accent} position={[0.6, 1.1, -0.7]} color="#ff6f5f" intensity={20} distance={5} />
      <pointLight position={[-2.1, 0.6, -0.4]} color="#4fc4b6" intensity={12} distance={4} />
    </>
  );
}

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
        <meshStandardMaterial color="#8d5a3c" roughness={0.88} />
      </mesh>
      {slats.map((i) => (
        <mesh key={i} position={[(i - 7) * 0.48, 0, 0]}>
          <boxGeometry args={[0.31, 4.65, 0.23]} />
          <meshStandardMaterial color={i % 2 ? "#a96e48" : "#815137"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Sign() {
  return (
    <group position={[0, 1.23, -1.82]}>
      <RoundedBox args={[3.55, 0.84, 0.11]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#2b211d" metalness={0.16} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[3.15, 0.44]} />
        <meshBasicMaterial color="#ffe38d" transparent opacity={0.44} />
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
        <meshStandardMaterial color="#c48345" roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[1.34, 0.72, 1.34]} radius={0.23} smoothness={4} position={[0, -0.48, 0.1]}>
        <meshStandardMaterial color="#ae673e" roughness={0.9} />
      </RoundedBox>
      {stripeXs.map((sx, i) => <mesh key={i} position={[sx, 0.18, 0.62]}><boxGeometry args={[0.055, 0.98, 0.025]} /><meshBasicMaterial color={i % 2 ? "#f2d27e" : "#5fb0c9"} transparent opacity={0.72} /></mesh>)}
    </group>
  );
  return (
    <group>
      <group position={[-2.45, -0.52, -1.55]}>
        <RoundedBox args={[1.2, 1.5, 0.38]} radius={0.08} smoothness={4}><meshStandardMaterial color="#3b2a22" roughness={0.68} metalness={0.16} /></RoundedBox>
        <mesh position={[0, -0.12, 0.21]}><planeGeometry args={[0.86, 0.68]} /><meshBasicMaterial color="#ff815e" transparent opacity={0.48} /></mesh>
      </group>
      <Chair x={-1.15} ry={0.16} />
      <Chair x={1.15} ry={-0.16} />
      <group position={[0, -1.0, -0.24]}>
        <mesh><cylinderGeometry args={[0.4, 0.4, 0.08, 28]} /><meshStandardMaterial color="#efc54c" roughness={0.55} /></mesh>
        <mesh position={[0, -0.45, 0]}><cylinderGeometry args={[0.055, 0.085, 0.84, 14]} /><meshStandardMaterial color="#2b2019" metalness={0.6} roughness={0.3} /></mesh>
        <mesh position={[0.08, 0.25, 0]}><cylinderGeometry args={[0.09, 0.09, 0.38, 16]} /><meshStandardMaterial color="#d6d8d0" metalness={0.25} roughness={0.32} /></mesh>
      </group>
    </group>
  );
}


function StudioDetails() {
  const Plant = ({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) => (
    <group position={[x, -0.86, z]} scale={scale}>
      <mesh position={[0, -0.22, 0]}><cylinderGeometry args={[0.22, 0.18, 0.38, 18]} /><meshStandardMaterial color="#d65d48" roughness={0.72} /></mesh>
      {[-0.18, 0, 0.18].map((dx, i) => (
        <mesh key={i} position={[dx, 0.18 + i * 0.05, 0]} rotation={[0, 0, dx * 1.7]}>
          <sphereGeometry args={[0.22, 18, 14]} />
          <meshStandardMaterial color={i === 1 ? "#3b806d" : "#4c967d"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );

  return (
    <group>
      <mesh position={[0, -1.47, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial color="#d9c4a8" roughness={0.95} />
      </mesh>
      <mesh position={[0.3, -1.455, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.62, 48]} />
        <meshStandardMaterial color="#f0d36c" roughness={0.92} />
      </mesh>
      <mesh position={[0.25, -1.445, 0.17]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 1.48, 48]} />
        <meshBasicMaterial color="#e86b55" transparent opacity={0.42} />
      </mesh>
      <Plant x={-3.05} z={-1.28} scale={1.05} />
      <Plant x={3.08} z={-1.42} scale={0.92} />
      <mesh position={[2.72, 0.95, -2.18]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.72, 0.95, 0.08]} />
        <meshStandardMaterial color="#4a9ab8" roughness={0.58} />
      </mesh>
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
      <color attach="background" args={["#efe7d9"]} />
      <fog attach="fog" args={["#efe7d9", 6.2, 11]} />
      <LightRig motionEnabled={motionEnabled} />
      <StudioDetails />
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
