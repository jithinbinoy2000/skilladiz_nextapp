'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function GamingProfileLanyard({
  userData,
  position = [0, 0, 20],
  gravity = [0, -30, 0],
  fov = 20,
  className = "",
  width = "100%",
  height = "500px"
}) {
  return (
    <div className={`relative z-0 overflow-hidden rounded-xl ${className}`} style={{ width, height, backgroundColor: "#000" }}>
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000))}
      >
        <ambientLight intensity={Math.PI * 0.4} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <GamingLanyardBand userData={userData} />
        </Physics>
        <Environment blur={0.8}>
          <Lightformer intensity={2} color="#888" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[50, 0.1, 1]} />
          <Lightformer intensity={2} color="#555" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[60, 0.1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function GamingLanyardBand({ userData }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const card = useRef();

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Minimal physics
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);
  useSphericalJoint(j2, card, [[0, 0, 0], [0, 0.9, 0]]);

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 6, linearDamping: 4 };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    curve.points[0].copy(j2.current.translation());
    curve.points[1].copy(j1.current.translation());
    curve.points[2].copy(fixed.current.translation());
    curve.points[3].copy(new THREE.Vector3(0, 3, 0));
    band.current.geometry.setPoints(curve.getPoints(16));
  });

  return (
    <>
      <group position={[0, 3, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody ref={j1} position={[0.4, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[0.8, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1, 0.01]} />
          <group
            scale={1.8}
            position={[0, -1, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
          >
            <mesh>
              <planeGeometry args={[1.6, 2.2]} />
              <meshBasicMaterial map={createMinimalCardTexture(userData)} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Rope */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial  color="#FFFFFF"        // Pure white
    lineWidth={.1}          // 2px equivalent thickness
    transparent={false} />
      </mesh>
    </>
  );
}

// 🎮 Minimal clean gaming card texture
function createMinimalCardTexture(userData) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Solid black background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle border glow
  const borderGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  borderGrad.addColorStop(0, "rgba(139,92,246,0.3)");
  borderGrad.addColorStop(1, "rgba(236,72,153,0.2)");
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 3;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Name & title
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.fillText(userData.name, canvas.width / 2, 90);

  ctx.font = "18px Arial";
  ctx.fillStyle = "#8B5CF6";
  ctx.fillText(userData.title, canvas.width / 2, 120);

  // Divider
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 140);
  ctx.lineTo(canvas.width - 40, 140);
  ctx.stroke();

  // Minimal stats
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  const stats = [
    { label: "Level", value: userData.level },
    { label: "Rank", value: userData.rank },
    { label: "Win Rate", value: `${userData.winRate}%` },
    { label: "Hours", value: userData.hoursPlayed },
    { label: "Joined", value: userData.joinDate }
  ];
  let y = 190;
  stats.forEach(stat => {
    ctx.fillStyle = "#8B5CF6";
    ctx.fillText(stat.label, 80, y);
    ctx.fillStyle = "#FFF";
    ctx.fillText(stat.value, 260, y);
    y += 35;
  });

  // Favorite Games
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#EC4899";
  ctx.textAlign = "center";
  ctx.fillText("Favorite Games", canvas.width / 2, 400);

  ctx.font = "14px Arial";
  ctx.fillStyle = "#AAA";
  userData.favoriteGames.slice(0, 3).forEach((game, i) => {
    ctx.fillText(game, canvas.width / 2, 430 + i * 25);
  });

  // Footer
  ctx.fillStyle = "#111";
  ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
  ctx.fillStyle = "#FFD700";
  ctx.font = "bold 14px Arial";
  ctx.fillText(`${userData.membershipType} MEMBER`, canvas.width / 2, canvas.height - 30);

  return new THREE.CanvasTexture(canvas);
}
