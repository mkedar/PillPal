import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Hammer from 'hammerjs';

const Pill = ({ color1, color2, length, radius }) => {
  const mount = useRef(null);
  const isMounted = useRef(true);
  const pill = useRef(null);
  const camera = useRef(null);
  const initialRotation = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight("#B5AFAD");
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ alpha: true });

    const pillHeight = 1.8;

    // Set up the scene
    camera.current.position.set(0, pillHeight / 2 + 0.8, 5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // Create a simple pill geometry
    const pillGeometry = new THREE.CapsuleGeometry(radius, length, 20, 20);

    // Create a custom material with gradient colors
    const pillMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(color1) },
        color2: { value: new THREE.Color(color2) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, step(0.5, vUv.y)), 1.0);
        }
      `,
    });
    
    
    

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

    hammer.on('pan', (event) => {
      const deltaX = event.deltaX;
      const sensitivity = 0.0005;
      pill.current.rotation.y += deltaX * sensitivity;
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sensitivity = 0.02;
      pill.current.rotation.y = initialRotation.current + scrollY * sensitivity;
    };

    // Set the initial rotation value
    initialRotation.current = pill.current.rotation.y;

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

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
        window.removeEventListener('scroll', handleScroll);

        // eslint-disable-next-line
        mount.current.removeChild(renderer.domElement);
      }
      isMounted.current = false;
    };
  }, [color1, color2, length, radius]);

  return <div ref={mount} />;
};

export default Pill;
