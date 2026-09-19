"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = { motionEnabled: boolean; explore?: boolean };

function CameraRig({ motionEnabled }: SceneProps) {
  const { camera, pointer } = useThree();
  const smoothScroll = useRef(0);

  useFrame(() => {
    const rawScroll = typeof window === "undefined" ? 0 : Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, motionEnabled ? rawScroll : 0, 0.04);
    const scroll = smoothScroll.current;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, motionEnabled ? pointer.x * 0.28 : 0, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.34 + (motionEnabled ? pointer.y * 0.12 : 0) - scroll * 0.08, 0.045);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.25 - scroll * 0.5, 0.045);
    camera.lookAt(pointer.x * 0.08, -0.02, -0.7);
  });

  return null;
}

function Lighting({ motionEnabled }: SceneProps) {
  const blue = useRef<THREE.PointLight>(null);
  const orange = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!motionEnabled) return;
    if (blue.current) blue.current.intensity = 8.5 + Math.sin(clock.elapsedTime * 0.45) * 0.8;
    if (orange.current) orange.current.intensity = 7.5 + Math.sin(clock.elapsedTime * 0.52 + 1.2) * 0.7;
  });

  return (
    <>
      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#fff6e8", "#49372f", 1.25]} />
      <spotLight position={[-3.6, 5.2, 4]} color="#fff1d1" intensity={68} angle={0.52} penumbra={0.92} distance={12} castShadow />
      <spotLight position={[3.6, 4.5, 3.5]} color="#d7efff" intensity={44} angle={0.56} penumbra={0.9} distance={11} castShadow />
      <pointLight ref={blue} position={[-2.6, 1.0, -1.9]} color="#2e6cff" intensity={8.5} distance={5} />
      <pointLight ref={orange} position={[2.2, 1.1, -1.9]} color="#ff6b32" intensity={7.5} distance={5} />
      <pointLight position={[0, -0.7, 0.4]} color="#ff7c2e" intensity={5} distance={3.4} />
    </>
  );
}

function LedStrip({ x, color, height = 4.9 }: { x: number; color: string; height?: number }) {
  return (
    <group position={[x, 0.15, -2.42]}>
      <mesh>
        <boxGeometry args={[0.055, height, 0.045]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={3.6} distance={2.3} />
    </group>
  );
}

function SlatWall() {
  const slats = useMemo(() => Array.from({ length: 42 }, (_, i) => i), []);
  return (
    <group>
      <mesh position={[0, 0.12, -2.62]} receiveShadow>
        <boxGeometry args={[9.4, 5.3, 0.18]} />
        <meshStandardMaterial color="#312621" roughness={0.95} />
      </mesh>
      {slats.map((i) => {
        const x = (i - 20.5) * 0.215;
        return (
          <mesh key={i} position={[x, 0.1, -2.48]} receiveShadow>
            <boxGeometry args={[0.105, 5.05, 0.12]} />
            <meshStandardMaterial color={i % 4 === 0 ? "#75513c" : i % 2 ? "#5f4233" : "#684735"} roughness={0.88} />
          </mesh>
        );
      })}
      <LedStrip x={-3.45} color="#ff6f2d" />
      <LedStrip x={-3.06} color="#4077ff" />
      <LedStrip x={-1.08} color="#ff8a36" />
      <LedStrip x={-0.86} color="#fff2d2" />
      <LedStrip x={0.78} color="#ff7a34" />
      <LedStrip x={1.05} color="#fff2d2" />
      <LedStrip x={2.45} color="#3f76ff" />
      <LedStrip x={2.73} color="#fff4dc" />
    </group>
  );
}

function Shelf({ x, y, width = 1.15, children }: { x: number; y: number; width?: number; children?: React.ReactNode }) {
  return (
    <group position={[x, y, -2.12]}>
      <RoundedBox args={[width, 0.12, 0.38]} radius={0.025} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color="#242323" roughness={0.52} metalness={0.12} />
      </RoundedBox>
      {children}
    </group>
  );
}

function Pot({ x, y, color = "#ddd6cc", scale = 1 }: { x: number; y: number; color?: string; scale?: number }) {
  return (
    <group position={[x, y, 0]} scale={scale}>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.11, 0.22, 18]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {[[-0.08,0.22,-0.25],[0.02,0.3,0.08],[0.1,0.22,0.34],[-0.02,0.42,-0.05]].map((v,i)=>(
        <mesh key={i} position={[v[0],v[1],0]} rotation={[0,0,v[2]]} scale={[0.38,0.9,0.18]} castShadow>
          <sphereGeometry args={[0.24,12,10]} />
          <meshStandardMaterial color={i % 2 ? "#4d7857" : "#5d8d63"} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function PictureFrame({ x, y, rotate = 0, tone = "#d6b184" }: { x: number; y: number; rotate?: number; tone?: string }) {
  return (
    <group position={[x, y, 0.02]} rotation={[0, 0, rotate]}>
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.52, 0.05]} />
        <meshStandardMaterial color="#f3efe7" roughness={0.52} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[0.31, 0.4]} />
        <meshStandardMaterial color={tone} roughness={0.75} />
      </mesh>
    </group>
  );
}

function ShelfDecor() {
  return (
    <>
      <Shelf x={-2.85} y={1.02} width={1.18}>
        <PictureFrame x={0.18} y={0.37} rotate={-0.08} tone="#b28a72" />
        <Pot x={-0.38} y={0.22} scale={0.8} />
        <mesh position={[-0.52,0.27,0]} castShadow>
          <sphereGeometry args={[0.09,12,10]} />
          <meshStandardMaterial color="#f4f0ea" />
        </mesh>
      </Shelf>

      <Shelf x={-0.9} y={1.15} width={1.18}>
        <Pot x={0.08} y={0.24} color="#8d8178" scale={1.05} />
        <Pot x={-0.34} y={0.17} color="#ded5c7" scale={0.72} />
        <mesh position={[0.39,0.25,0]} castShadow>
          <sphereGeometry args={[0.14,18,14]} />
          <meshStandardMaterial color="#e59c27" roughness={0.55} />
        </mesh>
      </Shelf>

      <Shelf x={0.75} y={1.1} width={1.18}>
        <Pot x={-0.18} y={0.22} color="#ece7df" scale={0.9} />
        <mesh position={[0.32,0.2,0]} castShadow>
          <sphereGeometry args={[0.1,18,14]} />
          <meshStandardMaterial color="#161616" metalness={0.45} roughness={0.25} />
        </mesh>
      </Shelf>

      <Shelf x={2.52} y={0.98} width={1.32}>
        <PictureFrame x={-0.1} y={0.36} rotate={0.04} tone="#d7a18f" />
        <mesh position={[0.39,0.22,0]} rotation={[0,0,-0.35]} castShadow>
          <coneGeometry args={[0.11,0.34,16]} />
          <meshStandardMaterial color="#e8e4df" roughness={0.52} />
        </mesh>
        <mesh position={[0.46,0.13,0]}>
          <boxGeometry args={[0.24,0.09,0.12]} />
          <meshStandardMaterial color="#c43f2d" roughness={0.42} />
        </mesh>
      </Shelf>
    </>
  );
}

function TuftButton({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.035,10,8]} />
      <meshStandardMaterial color="#d2c0a7" roughness={0.78} />
    </mesh>
  );
}

function CreamChair({ x, rotationY }: { x: number; rotationY: number }) {
  const tuft = [
    [-0.34,0.62], [0,0.64], [0.34,0.62],
    [-0.34,0.34], [0,0.36], [0.34,0.34],
  ];

  return (
    <group position={[x, -0.66, -0.72]} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[1.72, 1.48, 0.34]} radius={0.12} smoothness={3} position={[0, 0.38, -0.34]} castShadow receiveShadow>
        <meshStandardMaterial color="#d8c4aa" roughness={0.72} />
      </RoundedBox>
      <RoundedBox args={[1.47, 1.16, 0.24]} radius={0.11} smoothness={3} position={[0, 0.42, -0.12]} castShadow>
        <meshStandardMaterial color="#e8d7c0" roughness={0.82} />
      </RoundedBox>

      {tuft.map(([tx,ty],i)=><TuftButton key={i} x={tx} y={ty} z={0.02} />)}
      {[[-0.34,-0.18],[0,-0.18],[0.34,-0.18]].map(([tx,ty],i)=><TuftButton key={`s${i}`} x={tx} y={ty} z={0.49} />)}

      <RoundedBox args={[1.48, 0.26, 1.02]} radius={0.1} smoothness={3} position={[0, -0.28, 0.05]} castShadow receiveShadow>
        <meshStandardMaterial color="#d7c1a4" roughness={0.74} />
      </RoundedBox>
      <RoundedBox args={[1.36, 0.22, 0.9]} radius={0.09} smoothness={3} position={[0, -0.1, 0.12]} castShadow>
        <meshStandardMaterial color="#ead9c1" roughness={0.84} />
      </RoundedBox>

      {[-0.88,0.88].map((ax)=>(
        <RoundedBox key={ax} args={[0.28, 0.68, 1.04]} radius={0.09} smoothness={3} position={[ax, -0.02, 0.0]} castShadow>
          <meshStandardMaterial color="#dfccb3" roughness={0.8} />
        </RoundedBox>
      ))}

      {[-0.66,0.66].map((lx)=>(
        <group key={lx}>
          <mesh position={[lx,-0.82,0.33]} rotation={[0.16,0,lx>0?-0.11:0.11]} castShadow>
            <boxGeometry args={[0.12,0.72,0.12]} />
            <meshStandardMaterial color="#4a3126" roughness={0.72} />
          </mesh>
          <mesh position={[lx,-0.82,-0.28]} rotation={[-0.12,0,lx>0?-0.09:0.09]} castShadow>
            <boxGeometry args={[0.12,0.7,0.12]} />
            <meshStandardMaterial color="#4a3126" roughness={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Drink({ x, z, color, height = 0.36 }: { x: number; z: number; color: string; height?: number }) {
  return (
    <group position={[x, -0.58, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.075,0.07,height,18]} />
        <meshPhysicalMaterial color={color} roughness={0.35} metalness={0.08} />
      </mesh>
      <mesh position={[0,height/2+0.08,0]}>
        <cylinderGeometry args={[0.012,0.012,0.2,8]} />
        <meshStandardMaterial color="#2c2a28" roughness={0.5} />
      </mesh>
    </group>
  );
}

function AcrylicTable() {
  return (
    <group position={[0, -0.84, -0.06]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.62,0.62,0.1,40]} />
        <meshPhysicalMaterial color="#f06d1e" transmission={0.35} thickness={0.18} transparent opacity={0.72} roughness={0.18} metalness={0.02} />
      </mesh>
      <mesh position={[0,-0.48,0]} castShadow>
        <cylinderGeometry args={[0.43,0.43,0.74,40,1,true]} />
        <meshPhysicalMaterial color="#f06416" transmission={0.5} thickness={0.12} transparent opacity={0.48} roughness={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0,-0.85,0]} castShadow>
        <cylinderGeometry args={[0.52,0.52,0.08,40]} />
        <meshPhysicalMaterial color="#ee6a19" transmission={0.35} transparent opacity={0.6} roughness={0.16} />
      </mesh>
      <Drink x={-0.24} z={0.02} color="#e7792e" height={0.5} />
      <Drink x={0.28} z={0.04} color="#b52d36" height={0.38} />
      <Drink x={-0.02} z={-0.1} color="#d7d9d5" height={0.42} />
    </group>
  );
}

function BoomMic({ side, red = false }: { side: -1 | 1; red?: boolean }) {
  const baseX = side * 3.35;
  const micX = side * 1.05;

  return (
    <group>
      <mesh position={[baseX,-0.28,0.18]} castShadow>
        <cylinderGeometry args={[0.035,0.05,2.45,14]} />
        <meshStandardMaterial color="#181818" metalness={0.78} roughness={0.28} />
      </mesh>
      <mesh position={[side*2.3,0.62,-0.04]} rotation={[0,0,side<0?-1.34:1.34]} castShadow>
        <cylinderGeometry args={[0.03,0.03,2.25,12]} />
        <meshStandardMaterial color="#141414" metalness={0.82} roughness={0.24} />
      </mesh>
      <mesh position={[side*1.5,0.72,-0.08]} rotation={[0,0,side<0?-1.46:1.46]} castShadow>
        <cylinderGeometry args={[0.025,0.025,1.15,12]} />
        <meshStandardMaterial color="#141414" metalness={0.82} roughness={0.24} />
      </mesh>
      <group position={[micX,0.64,0.02]} rotation={[0,0,side<0?0.13:-0.13]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12,0.12,0.42,18]} />
          <meshStandardMaterial color="#272727" metalness={0.72} roughness={0.3} />
        </mesh>
        <mesh position={[0,0.24,0]} castShadow>
          <sphereGeometry args={[0.14,16,12]} />
          <meshStandardMaterial color={red ? "#db3940" : "#3a3838"} roughness={red ? 0.82 : 0.46} />
        </mesh>
        <mesh position={[0,-0.25,0]}>
          <torusGeometry args={[0.15,0.018,8,20]} />
          <meshStandardMaterial color="#121212" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function TallPlant({ x, mirror = false }: { x: number; mirror?: boolean }) {
  const leaves = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  return (
    <group position={[x, -1.03, -1.08]} scale={mirror ? [-1,1,1] : [1,1,1]}>
      <mesh position={[0,-0.18,0]} castShadow>
        <cylinderGeometry args={[0.22,0.18,0.46,18]} />
        <meshStandardMaterial color="#1f2020" roughness={0.88} />
      </mesh>
      <mesh position={[0,0.85,0]}>
        <cylinderGeometry args={[0.035,0.055,2.15,10]} />
        <meshStandardMaterial color="#35573f" roughness={0.9} />
      </mesh>
      {leaves.map((i)=>{
        const y=0.18+(i%7)*0.28;
        const side=i%2?-1:1;
        const angle=side*(0.45+(i%3)*0.12);
        return (
          <mesh key={i} position={[side*0.24,y,0]} rotation={[0.15,0,angle]} scale={[0.32,0.72,0.12]} castShadow>
            <sphereGeometry args={[0.35,12,8]} />
            <meshStandardMaterial color={i%3===0?"#3e734e":"#315f42"} roughness={0.86} />
          </mesh>
        );
      })}
    </group>
  );
}

function Rug() {
  return (
    <group>
      <mesh position={[0,-1.48,-0.05]} rotation={[-Math.PI/2,0,0]} receiveShadow>
        <circleGeometry args={[2.8,64]} />
        <meshStandardMaterial color="#ded4c8" roughness={1} />
      </mesh>
      <mesh position={[0,-1.46,-0.05]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[2.45,2.78,64]} />
        <meshStandardMaterial color="#e9e0d6" roughness={1} transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

function StudioSet() {
  return (
    <group>
      <Rug />
      <TallPlant x={-3.62} />
      <TallPlant x={3.62} mirror />
      <CreamChair x={-1.42} rotationY={0.08} />
      <CreamChair x={1.42} rotationY={-0.08} />
      <AcrylicTable />
      <BoomMic side={-1} />
      <BoomMic side={1} red />
    </group>
  );
}

export default function StudioScene({ motionEnabled, explore = false }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.34, 6.25], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#d8c7b7"]} />
      <fog attach="fog" args={["#d8c7b7", 8.8, 15]} />
      <Lighting motionEnabled={motionEnabled} />
      <mesh position={[0,-1.52,-0.1]} rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[12,8]} />
        <meshStandardMaterial color="#c6b4a4" roughness={0.98} />
      </mesh>
      <SlatWall />
      <ShelfDecor />
      <StudioSet />
      <ContactShadows position={[0,-1.47,0]} opacity={0.28} scale={9} blur={2.3} far={4.5} />

      {explore ? (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          minDistance={5.15}
          maxDistance={7.2}
          minPolarAngle={Math.PI * 0.38}
          maxPolarAngle={Math.PI * 0.58}
          minAzimuthAngle={-0.32}
          maxAzimuthAngle={0.32}
          target={[0,-0.12,-0.72]}
          enableDamping
          dampingFactor={0.06}
        />
      ) : (
        <CameraRig motionEnabled={motionEnabled} />
      )}
    </Canvas>
  );
}
