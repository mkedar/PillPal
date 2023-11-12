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

    const ambientLight = new THREE.AmbientLight(0xfffff);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

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
    const pillMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 1 });
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

    // Touch interaction
    pill.current.rotation.z = 0.50;
    const hammer = new Hammer(mount.current);
    let previousX = 0;

    hammer.on('pan', (event) => {
      // Use the pan event for touch-based interaction
      const deltaX = event.deltaX;
      //const deltaY = event.deltaY;

      // Adjust the sensitivity based on your preference
      const sensitivity = 0.0005;

      //pill.current.rotation.x += deltaY * sensitivity;
      pill.current.rotation.y += deltaX * sensitivity;
    });

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);

      if (pill.current) {
        renderer.render(scene, camera.current);
      }
    };

    animate();

    // Cleanup on component unmount
    return () => {
      if (isMounted.current) {
        window.removeEventListener('resize', handleResize);
        mount.current.removeChild(renderer.domElement);
      }
      isMounted.current = false;
    };
  }, []);

  return <div ref={mount} />;
};

export default Pill;
