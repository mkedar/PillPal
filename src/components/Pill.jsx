import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

const Pill = () => {
  const location = useLocation();
  const pillContainerRef = useRef();
  let scene, camera, renderer, pillMesh, animateId;

  useEffect(() => {
    const cleanUp = () => {
      // Stop the animation loop
      cancelAnimationFrame(animateId);

      // Dispose of the renderer
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }

      // Remove the pillMesh from the scene and clear its geometry and material
      if (scene && pillMesh) {
        scene.remove(pillMesh);
        pillMesh.geometry.dispose();
        pillMesh.material.dispose();
        pillMesh = null;
      }

      // Clear the scene
      scene = null;

      // Set the camera to null
      camera = null;
    };

    // Check if the current location is the "pill" page
    if (location.pathname === '/PillPage') {
      // Clean up existing scene before creating a new one
      cleanUp();

      // Initialize Three.js components
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: false });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Append the renderer's DOM element to the container
      pillContainerRef.current.appendChild(renderer.domElement);

      // Use a capsule geometry to create a pill shape
      const geometry = new THREE.CapsuleGeometry(0.3, 0.8, 20, 20);
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7 });
      pillMesh = new THREE.Mesh(geometry, material);
      scene.add(pillMesh);

      // Position the pill at the center and higher up
      pillMesh.position.y = 10;
      pillMesh.position.x = 0;
      pillMesh.position.z = 0;

      // Adjust the camera position
      camera.position.set(0, 5, 10);

      function animate() {
        animateId = requestAnimationFrame(animate);
        pillMesh.rotation.x += 0.01;
        pillMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      animate();
    }

    // Clean up Three.js resources when leaving the "pill" page or when the component unmounts
    return () => {
      cleanUp();
    };
  }, [location.pathname]);

  return <div id="pill-container" ref={pillContainerRef}></div>;
};

export default Pill;
