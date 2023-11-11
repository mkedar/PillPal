import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Hammer from 'hammerjs';

const Pill = () => {
  const mount = useRef(null);
  const isMounted = useRef(true);
  const pill = useRef(null);
  const camera = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ alpha: false });

    const pillHeight = 1.8;

    // Set up the scene
    camera.current.position.set(0, pillHeight / 2 + 0.8, 5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // Create a simple pill geometry
    const pillGeometry = new THREE.CapsuleGeometry(0.9, pillHeight, 20, 20);
    const pillMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 1 });
    pill.current = new THREE.Mesh(pillGeometry, pillMaterial);

    // Center the pill in the scene
    pill.current.position.set(0, pillHeight, 0);
    scene.add(pill.current);

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.current.aspect = innerWidth / innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Swipe interaction
    let previousX = 0;

    // Mouse swipe interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 2;
      mouseY = (event.clientY - windowHalfY) / 2;
    };

    document.addEventListener('mousemove', onMouseMove);

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);

      if (pill.current) { // Check if pill is defined
        targetRotationX += 0.05 * (mouseX - targetRotationX);
        targetRotationY += 0.05 * (mouseY - targetRotationY);

        pill.current.rotation.x = targetRotationY * 0.005;
        pill.current.rotation.y = targetRotationX * 0.005;
      }

      renderer.render(scene, camera.current);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      if (isMounted.current) {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onMouseMove);
        mount.current.removeChild(renderer.domElement);
      }
      isMounted.current = false;
    };
  }, []);

  return <div ref={mount} />;
};

export default Pill;
