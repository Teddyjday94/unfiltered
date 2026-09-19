"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { RoomShell, StudioLights } from "@/components/studio/RoomShell";
import { Furniture } from "@/components/studio/Furniture";

type SceneProps = { motionEnabled: boolean; explore?: boolean };

function CameraRig({ motionEnabled }: SceneProps) {
  const { camera, pointer } = useThree();
  const smoothScroll = useRef(0);

  useFrame(() => {
    const raw = typeof window === "undefined" ? 0 : Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);
    smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, motionEnabled ? raw : 0, 0.04);
    const scroll = smoothScroll.current;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, motionEnabled ? pointer.x * 0.28 : 0, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.34 + (motionEnabled ? pointer.y * 0.12 : 0) - scroll * 0.08, 0.045);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.25 - scroll * 0.5, 0.045);
    camera.lookAt(pointer.x * 0.08, -0.02, -0.7);
  });

  return null;
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

      <StudioLights motionEnabled={motionEnabled} />
      <RoomShell />
      <Furniture />
      <ContactShadows position={[0, -1.47, 0]} opacity={0.28} scale={9} blur={2.3} far={4.5} />

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
          target={[0, -0.12, -0.72]}
          enableDamping
          dampingFactor={0.06}
        />
      ) : (
        <CameraRig motionEnabled={motionEnabled} />
      )}
    </Canvas>
  );
}
