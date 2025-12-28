import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Physics, RigidBody, useRopeJoint, useSphericalJoint, BallCollider, CuboidCollider } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

const LanyardIDCard = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      /* background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', // Remove background for transparent effect */
      position: 'relative',
      top: '-50px',
      borderRadius:'10px',
    }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 20 }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        {/* <color attach="background" args={['#1e1b4b']} /> // Remove canvas background for transparency */}
        <ambientLight intensity={Math.PI * 0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.5} />

        <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
      </Canvas>
    </div>
  );
};

const Band = ({ maxSpeed = 50, minSpeed = 0, isMobile = false }) => {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const cardMesh = useRef();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  // Create lanyard texture
  const lanyardTexture = useRef();
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    // Create black textured pattern
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.fillStyle = i % 40 === 0 ? '#1a1a1a' : '#2d2d2d';
      ctx.fillRect(i, 0, 20, canvas.height);
    }

    lanyardTexture.current = new THREE.CanvasTexture(canvas);
    lanyardTexture.current.wrapS = lanyardTexture.current.wrapT = THREE.RepeatWrapping;
  }, []);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card with physics */}
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* ID Card with HTML/CSS styling */}
            <IDCardMesh ref={cardMesh} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard band/strap */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#1a1a1a"
          lineWidth={1}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          map={lanyardTexture.current}
          useMap={!!lanyardTexture.current}
          repeat={[-4, 1]}
          depthTest={false}
        />
      </mesh>
    </>
  );
};

const IDCardMesh = React.forwardRef((props, ref) => {
  const htmlTexture = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    // Create HTML canvas for ID card
    const canvas = document.createElement('canvas');
    const scale = 2; // Higher resolution
    canvas.width = 340 * scale;
    canvas.height = 480 * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 340, 480);
    gradient.addColorStop(0, '#2d3748');
    gradient.addColorStop(1, '#1a202c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 340, 480);

    // Card border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, 330, 470);

    // Header section
    const headerGradient = ctx.createLinearGradient(0, 0, 340, 80);
    headerGradient.addColorStop(0, '#4a5568');
    headerGradient.addColorStop(1, '#2d3748');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, 340, 80);

    // Hole punch at top
    ctx.fillStyle = '#0f0f1f';
    ctx.beginPath();
    ctx.arc(170, 20, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Photo placeholder
    ctx.fillStyle = '#1a202c';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 4;
    const photoX = 70;
    const photoY = 100;
    const photoSize = 200;
    ctx.fillRect(photoX, photoY, photoSize, photoSize);
    ctx.strokeRect(photoX, photoY, photoSize, photoSize);

    // Photo overlay gradient
    const photoGradient = ctx.createLinearGradient(photoX, photoY, photoX + photoSize, photoY + photoSize);
    photoGradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
    photoGradient.addColorStop(0.5, 'transparent');
    photoGradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
    ctx.fillStyle = photoGradient;
    ctx.fillRect(photoX, photoY, photoSize, photoSize);

    // Text "Photo Here"
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Your Photo', 170, 190);
    ctx.fillText('Here', 170, 210);

    // Name
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Javi A. Torres', 170, 340);

    // Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui';
    ctx.fillText('Software Engineer', 170, 365);

    // Divider
    const dividerGradient = ctx.createLinearGradient(140, 380, 200, 380);
    dividerGradient.addColorStop(0, 'transparent');
    dividerGradient.addColorStop(0.5, '#6366f1');
    dividerGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = dividerGradient;
    ctx.fillRect(140, 380, 60, 3);

    // Info box background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const infoX = 30;
    const infoY = 395;
    const infoW = 280;
    const infoH = 65;
    ctx.beginPath();
    ctx.roundRect(infoX, infoY, infoW, infoH, 12);
    ctx.fill();
    ctx.stroke();

    // Info text
    ctx.font = '12px system-ui';
    ctx.textAlign = 'left';

    // Row 1
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ID NUMBER', 45, 415);
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'right';
    ctx.fillText('SE-2024-001', 295, 415);

    // Row 2
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('DEPARTMENT', 45, 435);
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'right';
    ctx.fillText('Engineering', 295, 435);

    // Row 3
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('STATUS', 45, 455);
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'right';
    ctx.fillText('Active', 295, 455);

    const cardTexture = new THREE.CanvasTexture(canvas);
    cardTexture.needsUpdate = true;
    setTexture(cardTexture);
  }, []);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1.6, 2.25]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
});

export default LanyardIDCard;
