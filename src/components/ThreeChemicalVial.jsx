import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Droplets, Sparkles, ZoomIn } from 'lucide-react';

export default function ThreeChemicalVial({
  targetColor = '#2563eb', // e.g. Scott Reagent Cobalt Blue
  kitName = 'Scott Reagent Test',
  substance = 'Cocaine HCl',
  isReacting = false,
  onDropletAdded = null
}) {
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [fluidProgress, setFluidProgress] = useState(0); // 0 (unreacted) to 1 (full reaction)
  const [dropletActive, setDropletActive] = useState(false);

  // References for animation
  const sceneRef = useRef(null);
  const liquidMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const dropletMeshRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 300;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lighting (Studio light setup with warm metallic reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7e6, 1.4);
    keyLight.position.set(4, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd9e5ff, 0.8);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.2, 8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 3. 3D Test Tube Group
    const vialGroup = new THREE.Group();
    scene.add(vialGroup);

    // Outer Glass Body (Cylinder + Hemisphere bottom)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });

    const glassGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.6, 32, 1, true);
    const glassCylinder = new THREE.Mesh(glassGeo, glassMaterial);
    vialGroup.add(glassCylinder);

    const bottomGeo = new THREE.SphereGeometry(0.7, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const glassBottom = new THREE.Mesh(bottomGeo, glassMaterial);
    glassBottom.position.y = -1.3;
    vialGroup.add(glassBottom);

    // Top Rim Collar
    const rimGeo = new THREE.TorusGeometry(0.72, 0.06, 16, 32);
    const rimMesh = new THREE.Mesh(rimGeo, glassMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.3;
    vialGroup.add(rimMesh);

    // Metallic Cap / Stopper
    const capGeo = new THREE.CylinderGeometry(0.75, 0.68, 0.35, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xd6cebe,
      metalness: 0.7,
      roughness: 0.25
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 1.48;
    vialGroup.add(capMesh);

    // 4. Liquid Inside the Vial
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fef3c7'), // Initial pale amber reagent
      transparent: true,
      opacity: 0.88,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.33
    });

    const liquidGeo = new THREE.CylinderGeometry(0.64, 0.64, 1.8, 32);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
    liquidMesh.position.y = -0.4;
    vialGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Liquid Bottom hemisphere
    const liquidBottomGeo = new THREE.SphereGeometry(0.64, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const liquidBottom = new THREE.Mesh(liquidBottomGeo, liquidMaterial);
    liquidBottom.position.y = -1.3;
    vialGroup.add(liquidBottom);

    // 5. Chemical Reaction Effervescence (Bubbling 3D Particles)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = -1.2 + Math.random() * 1.6;
      particlePositions[i * 3 + 2] = Math.sin(theta) * r;
      particleSpeeds[i] = 0.008 + Math.random() * 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    vialGroup.add(particleSystem);
    particlesRef.current = { system: particleSystem, speeds: particleSpeeds };

    // 6. Interactive Droplet Mesh
    const dropGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      metalness: 0.3,
      roughness: 0.2
    });
    const dropletMesh = new THREE.Mesh(dropGeo, dropMat);
    dropletMesh.position.set(0, 2.2, 0);
    dropletMesh.visible = false;
    vialGroup.add(dropletMesh);
    dropletMeshRef.current = dropletMesh;

    // Mouse Interaction (Click & Drag to Rotate)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      vialGroup.rotation.y += deltaX * 0.01;
      vialGroup.rotation.x = Math.max(-0.4, Math.min(0.4, vialGroup.rotation.x + deltaY * 0.01));
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        vialGroup.rotation.y += 0.008;
      }

      // Animate bubble particles floating upwards
      if (particlesRef.current) {
        const positions = particlesRef.current.system.geometry.attributes.position.array;
        const speeds = particlesRef.current.speeds;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += speeds[i];
          if (positions[i * 3 + 1] > 0.45) {
            positions[i * 3 + 1] = -1.2;
          }
        }
        particlesRef.current.system.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Liquid Color smoothly when reaction progresses
  useEffect(() => {
    if (!liquidMeshRef.current) return;

    const baseColor = new THREE.Color('#fef3c7'); // unreacted
    const reactedColor = new THREE.Color(targetColor);
    
    // Smooth lerp color
    const currentColor = new THREE.Color().lerpColors(baseColor, reactedColor, fluidProgress);
    liquidMeshRef.current.material.color = currentColor;
  }, [fluidProgress, targetColor]);

  // Handle "Add Chemical Droplet" animation
  const triggerDropletAnimation = () => {
    if (dropletActive || !dropletMeshRef.current) return;
    setDropletActive(true);

    const droplet = dropletMeshRef.current;
    droplet.visible = true;
    droplet.position.set(0, 2.2, 0);

    let progress = 0;
    const dropInterval = setInterval(() => {
      progress += 0.08;
      droplet.position.y = 2.2 - progress * 2.4;

      if (progress >= 1) {
        clearInterval(dropInterval);
        droplet.visible = false;
        setDropletActive(false);

        // Animate color transformation over 1.2s
        let trans = 0;
        const colorInterval = setInterval(() => {
          trans += 0.05;
          setFluidProgress(Math.min(1, trans));
          if (trans >= 1) {
            clearInterval(colorInterval);
            if (onDropletAdded) onDropletAdded();
          }
        }, 50);
      }
    }, 25);
  };

  return (
    <div className="tactile-well" style={{ padding: 18, position: 'relative' }}>
      {/* 3D Viewport Title & Diagnostics */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="led-jewel green" />
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            3D MOLECULAR REACTION CHAMBER
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          WebGL // THREE.JS 3D
        </span>
      </div>

      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: 300, 
          cursor: 'grab', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          userSelect: 'none'
        }} 
      />

      {/* Interactive Controls Overlay */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        borderTop: '1px solid rgba(162, 154, 140, 0.3)',
        paddingTop: 12
      }}>
        {/* Reagent Droplet Trigger */}
        <button
          onClick={triggerDropletAnimation}
          disabled={dropletActive}
          className="btn-tactile-amber"
          style={{ padding: '8px 14px', fontSize: 12 }}
        >
          <Droplets size={14} />
          {dropletActive ? 'Dispensing Droplet...' : 'Add Reagent Droplet'}
        </button>

        {/* Rotate Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsRotating(prev => !prev)}
            className="btn-tactile"
            style={{ padding: '7px 12px', fontSize: 11.5 }}
            title="Toggle continuous 3D rotation"
          >
            <RotateCw size={12} />
            {isRotating ? 'Pause Spin' : 'Auto Spin'}
          </button>
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
            Drag to Rotate 3D
          </span>
        </div>
      </div>
    </div>
  );
}
