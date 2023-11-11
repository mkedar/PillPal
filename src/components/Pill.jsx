import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom


const Pill = () => {
  // eslint-disable-next-line
  const location = useLocation();

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for a transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Use a capsule geometry to create a pill shape
    const geometry = new THREE.CapsuleGeometry(0.29, 0.8, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const pillMesh = new THREE.Mesh(geometry, material);
    scene.add(pillMesh);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      // Rotate the pill
      pillMesh.rotation.x += 0.01;
      pillMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div id="pill-container">
      <canvas id="pill-canvas"></canvas>
    </div>
  );
};

export default Pill;
