import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Pill = () => {
  const mount = useRef(null);
  const isMounted = useRef(true); // Keep track of whether the component is mounted

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Set up the scene
    camera.position.set(0, 0, 5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // Create a simple pill geometry
    const pillGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const pillMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const pill = new THREE.Mesh(pillGeometry, pillMaterial);

    // Center the pill in the scene
    pill.position.set(0, 0, 0);
    scene.add(pill);

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);
      // Add any animation logic here if needed
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      // Check if the component is still mounted before removing the renderer's DOM element
      if (isMounted.current) {
        window.removeEventListener('resize', handleResize);
        mount.current.removeChild(renderer.domElement);
      }
      // Update the isMounted flag to false when unmounting
      isMounted.current = false;
    };
  }, []);

  return <div ref={mount} />;
};

export default Pill;
