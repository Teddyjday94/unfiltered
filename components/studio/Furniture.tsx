"use client";

import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Tuft({x,y,z}:{x:number;y:number;z:number}){
  return <mesh position={[x,y,z]}><sphereGeometry args={[.035,10,8]}/><meshStandardMaterial color="#d2c0a7" roughness={.78}/></mesh>;
}

export function CreamChair({x,rotationY}:{x:number;rotationY:number}){
  const back=[[-.34,.62],[0,.64],[.34,.62],[-.34,.34],[0,.36],[.34,.34]];
  const seat=[[-.34,-.18],[0,-.18],[.34,-.18]];
  return <group position={[x,-.66,-.72]} rotation={[0,rotationY,0]}>
    <RoundedBox args={[1.72,1.48,.34]} radius={.12} smoothness={3} position={[0,.38,-.34]} castShadow receiveShadow>
      <meshStandardMaterial color="#d8c4aa" roughness={.72}/>
    </RoundedBox>
    <RoundedBox args={[1.47,1.16,.24]} radius={.11} smoothness={3} position={[0,.42,-.12]} castShadow>
      <meshStandardMaterial color="#e8d7c0" roughness={.82}/>
    </RoundedBox>
    {back.map(([tx,ty],i)=><Tuft key={i} x={tx} y={ty} z={.02}/>)}
    {seat.map(([tx,ty],i)=><Tuft key={"s"+i} x={tx} y={ty} z={.49}/>)}
    <RoundedBox args={[1.48,.26,1.02]} radius={.1} smoothness={3} position={[0,-.28,.05]} castShadow receiveShadow>
      <meshStandardMaterial color="#d7c1a4" roughness={.74}/>
    </RoundedBox>
    <RoundedBox args={[1.36,.22,.9]} radius={.09} smoothness={3} position={[0,-.1,.12]} castShadow>
      <meshStandardMaterial color="#ead9c1" roughness={.84}/>
    </RoundedBox>
    {[-.88,.88].map(ax=><RoundedBox key={ax} args={[.28,.68,1.04]} radius={.09} smoothness={3} position={[ax,-.02,0]} castShadow>
      <meshStandardMaterial color="#dfccb3" roughness={.8}/>
    </RoundedBox>)}
    {[-.66,.66].map(lx=><group key={lx}>
      <mesh position={[lx,-.6,.33]} rotation={[.08,0,lx>0?-.06:.06]} castShadow><boxGeometry args={[.13,.5,.13]}/><meshStandardMaterial color="#4a3126" roughness={.72}/></mesh>
      <mesh position={[lx,-.6,-.28]} rotation={[-.06,0,lx>0?-.05:.05]} castShadow><boxGeometry args={[.13,.5,.13]}/><meshStandardMaterial color="#4a3126" roughness={.72}/></mesh>
    </group>)}
  </group>;
}

function Drink({x,z,color,height=.36}:{x:number;z:number;color:string;height?:number}){
  return <group position={[x,-.64,z]}>
    <mesh castShadow><cylinderGeometry args={[.075,.07,height,18]}/><meshPhysicalMaterial color={color} roughness={.35} metalness={.08}/></mesh>
    <mesh position={[0,height/2+.08,0]}><cylinderGeometry args={[.012,.012,.2,8]}/><meshStandardMaterial color="#2c2a28" roughness={.5}/></mesh>
  </group>;
}

export function AcrylicTable(){
  return <group position={[0,0,-.06]}>
    <mesh position={[0,-.86,0]} castShadow receiveShadow><cylinderGeometry args={[.62,.62,.1,40]}/><meshPhysicalMaterial color="#f06d1e" transmission={.35} thickness={.18} transparent opacity={.72} roughness={.18}/></mesh>
    <mesh position={[0,-1.17,0]} castShadow><cylinderGeometry args={[.43,.43,.56,40,1,true]}/><meshPhysicalMaterial color="#f06416" transmission={.5} thickness={.12} transparent opacity={.48} roughness={.12} side={THREE.DoubleSide}/></mesh>
    <mesh position={[0,-1.46,0]} castShadow receiveShadow><cylinderGeometry args={[.52,.52,.08,40]}/><meshPhysicalMaterial color="#ee6a19" transmission={.35} transparent opacity={.6} roughness={.16}/></mesh>
    <Drink x={-.24} z={.02} color="#e7792e" height={.5}/><Drink x={.28} z={.04} color="#b52d36" height={.38}/><Drink x={-.02} z={-.1} color="#d7d9d5" height={.42}/>
  </group>;
}

export function BoomMic({side,red=false}:{side:-1|1;red?:boolean}){
  const baseX=side*3.35, micX=side*1.05;
  return <group>
    <mesh position={[baseX,-.28,.18]} castShadow><cylinderGeometry args={[.035,.05,2.45,14]}/><meshStandardMaterial color="#181818" metalness={.78} roughness={.28}/></mesh>
    <mesh position={[side*2.3,.62,-.04]} rotation={[0,0,side<0?-1.34:1.34]} castShadow><cylinderGeometry args={[.03,.03,2.25,12]}/><meshStandardMaterial color="#141414" metalness={.82} roughness={.24}/></mesh>
    <mesh position={[side*1.5,.72,-.08]} rotation={[0,0,side<0?-1.46:1.46]} castShadow><cylinderGeometry args={[.025,.025,1.15,12]}/><meshStandardMaterial color="#141414" metalness={.82} roughness={.24}/></mesh>
    <group position={[micX,.64,.02]} rotation={[0,0,side<0?.13:-.13]}>
      <mesh castShadow><cylinderGeometry args={[.12,.12,.42,18]}/><meshStandardMaterial color="#272727" metalness={.72} roughness={.3}/></mesh>
      <mesh position={[0,.24,0]} castShadow><sphereGeometry args={[.14,16,12]}/><meshStandardMaterial color={red?"#db3940":"#3a3838"} roughness={red?.82:.46}/></mesh>
      <mesh position={[0,-.25,0]}><torusGeometry args={[.15,.018,8,20]}/><meshStandardMaterial color="#121212" metalness={.7} roughness={.3}/></mesh>
    </group>
  </group>;
}

export function Furniture(){
  return <>
    <CreamChair x={-1.42} rotationY={.08}/><CreamChair x={1.42} rotationY={-.08}/>
    <AcrylicTable/><BoomMic side={-1}/><BoomMic side={1} red/>
  </>;
}
