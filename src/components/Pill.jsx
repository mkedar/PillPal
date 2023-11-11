import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Pill = () => {
  const mount = useRef(null);
  const isMounted = useRef(true); // Keep track of whether the component is mounted

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //honestly not that sure what this does
    let renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ alpha: false }); //set to true to make background transparent


    // Set up the scene
    camera.position.set(0, 0, 5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // Create a simple pill geometry
    const pillGeometry = new THREE.CapsuleGeometry(0.3, 0.8, 20, 20); // {radius, height, polygon side, pilygon top circle}
    const pillMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 1 });
    const pill = new THREE.Mesh(pillGeometry, pillMaterial);

    // Center the pill in the scene
    pill.position.set(0, 0, 0); //moves the pill around the scene {x,y,z}
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
        pill.rotation.x += 0.01; // spin forward + or backwards -
        pill.rotation.y += 0.01; // honestly not sure, only takes affect when z is affected
        pill.rotation.z +=0.01; //makes it spin diagonally like a clock +
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      // Check if the component is still mounted before removing the renderer's DOM element
      if (isMounted.current) {
        window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line
        mount.current.removeChild(renderer.domElement);
      }
      // Update the isMounted flag to false when unmounting
      isMounted.current = false;
    };
  }, []);

  return <div ref={mount} />;
};

export default Pill;
