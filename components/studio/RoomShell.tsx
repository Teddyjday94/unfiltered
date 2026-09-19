"use client";

import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function StudioLights({ motionEnabled }: { motionEnabled: boolean }) {
  const blue=useRef<THREE.PointLight>(null);
  const orange=useRef<THREE.PointLight>(null);
  useFrame(({clock})=>{
    if(!motionEnabled) return;
    if(blue.current) blue.current.intensity=8.5+Math.sin(clock.elapsedTime*.45)*.8;
    if(orange.current) orange.current.intensity=7.5+Math.sin(clock.elapsedTime*.52+1.2)*.7;
  });
  return <>
    <ambientLight intensity={1.05}/>
    <hemisphereLight args={["#fff6e8","#49372f",1.25]}/>
    <spotLight position={[-3.6,5.2,4]} color="#fff1d1" intensity={68} angle={.52} penumbra={.92} distance={12} castShadow/>
    <spotLight position={[3.6,4.5,3.5]} color="#d7efff" intensity={44} angle={.56} penumbra={.9} distance={11} castShadow/>
    <pointLight ref={blue} position={[-2.6,1,-1.9]} color="#2e6cff" intensity={8.5} distance={5}/>
    <pointLight ref={orange} position={[2.2,1.1,-1.9]} color="#ff6b32" intensity={7.5} distance={5}/>
    <pointLight position={[0,-.7,.4]} color="#ff7c2e" intensity={5} distance={3.4}/>
  </>;
}

function Led({x,color}:{x:number;color:string}){
  return <group position={[x,.15,-2.42]}>
    <mesh><boxGeometry args={[.055,4.9,.045]}/><meshBasicMaterial color={color} toneMapped={false}/></mesh>
    <pointLight color={color} intensity={3.4} distance={2.2}/>
  </group>;
}

function SlatWall(){
  const slats=useMemo(()=>Array.from({length:42},(_,i)=>i),[]);
  return <group>
    <mesh position={[0,.12,-2.62]} receiveShadow><boxGeometry args={[9.4,5.3,.18]}/><meshStandardMaterial color="#312621" roughness={.95}/></mesh>
    {slats.map(i=>{
      const x=(i-20.5)*.215;
      return <mesh key={i} position={[x,.1,-2.48]} receiveShadow>
        <boxGeometry args={[.105,5.05,.12]}/>
        <meshStandardMaterial color={i%4===0?"#75513c":i%2?"#5f4233":"#684735"} roughness={.88}/>
      </mesh>;
    })}
    <Led x={-3.45} color="#ff6f2d"/><Led x={-3.06} color="#4077ff"/>
    <Led x={-1.08} color="#ff8a36"/><Led x={-.86} color="#fff2d2"/>
    <Led x={.78} color="#ff7a34"/><Led x={1.05} color="#fff2d2"/>
    <Led x={2.45} color="#3f76ff"/><Led x={2.73} color="#fff4dc"/>
  </group>;
}

function Pot({x,y,color="#ddd6cc",scale=1}:{x:number;y:number;color?:string;scale?:number}){
  const leaves=[[-.08,.22,-.25],[.02,.3,.08],[.1,.22,.34],[-.02,.42,-.05]];
  return <group position={[x,y,0]} scale={scale}>
    <mesh castShadow><cylinderGeometry args={[.14,.11,.22,18]}/><meshStandardMaterial color={color} roughness={.8}/></mesh>
    {leaves.map((v,i)=><mesh key={i} position={[v[0],v[1],0]} rotation={[0,0,v[2]]} scale={[.38,.9,.18]} castShadow>
      <sphereGeometry args={[.24,12,10]}/><meshStandardMaterial color={i%2?"#4d7857":"#5d8d63"} roughness={.85}/>
    </mesh>)}
  </group>;
}

function Frame({x,y,tone}:{x:number;y:number;tone:string}){
  return <group position={[x,y,.02]}>
    <mesh castShadow><boxGeometry args={[.42,.52,.05]}/><meshStandardMaterial color="#f3efe7" roughness={.52}/></mesh>
    <mesh position={[0,0,.03]}><planeGeometry args={[.31,.4]}/><meshStandardMaterial color={tone} roughness={.75}/></mesh>
  </group>;
}

function Shelf({x,y,width=1.18,children}:{x:number;y:number;width?:number;children:React.ReactNode}){
  return <group position={[x,y,-2.12]}>
    <RoundedBox args={[width,.12,.38]} radius={.025} smoothness={2} castShadow receiveShadow>
      <meshStandardMaterial color="#242323" roughness={.52} metalness={.12}/>
    </RoundedBox>
    {children}
  </group>;
}

function Shelves(){
  return <>
    <Shelf x={-2.85} y={1.02}><Frame x={.18} y={.37} tone="#b28a72"/><Pot x={-.38} y={.22} scale={.8}/></Shelf>
    <Shelf x={-.9} y={1.15}><Pot x={.08} y={.24} color="#8d8178" scale={1.05}/><mesh position={[.39,.25,0]} castShadow><sphereGeometry args={[.14,18,14]}/><meshStandardMaterial color="#e59c27" roughness={.55}/></mesh></Shelf>
    <Shelf x={.75} y={1.1}><Pot x={-.18} y={.22} color="#ece7df" scale={.9}/><mesh position={[.32,.2,0]} castShadow><sphereGeometry args={[.1,18,14]}/><meshStandardMaterial color="#161616" metalness={.45} roughness={.25}/></mesh></Shelf>
    <Shelf x={2.52} y={.98} width={1.32}><Frame x={-.1} y={.36} tone="#d7a18f"/><mesh position={[.46,.13,0]}><boxGeometry args={[.24,.09,.12]}/><meshStandardMaterial color="#c43f2d" roughness={.42}/></mesh></Shelf>
  </>;
}

function TallPlant({x,mirror=false}:{x:number;mirror?:boolean}){
  const leaves=useMemo(()=>Array.from({length:14},(_,i)=>i),[]);
  return <group position={[x,-1.03,-1.08]} scale={mirror?[-1,1,1]:[1,1,1]}>
    <mesh position={[0,-.18,0]} castShadow><cylinderGeometry args={[.22,.18,.46,18]}/><meshStandardMaterial color="#1f2020" roughness={.88}/></mesh>
    <mesh position={[0,.85,0]}><cylinderGeometry args={[.035,.055,2.15,10]}/><meshStandardMaterial color="#35573f" roughness={.9}/></mesh>
    {leaves.map(i=>{
      const y=.18+(i%7)*.28, side=i%2?-1:1, angle=side*(.45+(i%3)*.12);
      return <mesh key={i} position={[side*.24,y,0]} rotation={[.15,0,angle]} scale={[.32,.72,.12]} castShadow>
        <sphereGeometry args={[.35,12,8]}/><meshStandardMaterial color={i%3===0?"#3e734e":"#315f42"} roughness={.86}/>
      </mesh>;
    })}
  </group>;
}

export function RoomShell(){
  return <>
    <mesh position={[0,-1.52,-.1]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[12,8]}/><meshStandardMaterial color="#c6b4a4" roughness={.98}/></mesh>
    <SlatWall/><Shelves/><TallPlant x={-3.62}/><TallPlant x={3.62} mirror/>
    <mesh position={[0,-1.48,-.05]} rotation={[-Math.PI/2,0,0]} receiveShadow><circleGeometry args={[2.8,64]}/><meshStandardMaterial color="#ded4c8" roughness={1}/></mesh>
    <mesh position={[0,-1.46,-.05]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[2.45,2.78,64]}/><meshStandardMaterial color="#e9e0d6" roughness={1} transparent opacity={.82}/></mesh>
  </>;
}
