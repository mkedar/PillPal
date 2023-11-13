import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Hammer from 'hammerjs';

const Pill = ({ color1, color2, length, radius }) => {
  const mount = useRef(null);
  const isMounted = useRef(true);
  const pill = useRef(null);
  const camera = useRef(null);
  const initialRotation = useRef(0);
  const decayFactor = 0.95;
  const rotationalVelocity = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight("#B5AFAD");
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(3, 7, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;

    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    scene.add(ground);

    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true });

    const pillHeight = 1.8;

    camera.current.position.set(0, pillHeight / 2 + 0.8, 5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mount.current.appendChild(renderer.domElement);

    const pillGeometry = new THREE.CapsuleGeometry(radius, length, 20, 20);

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
    pill.current.castShadow = true;
    pill.current.receiveShadow = true;

    pill.current.position.set(0, pillHeight, 0);
    // Rotate the pill at an angle
    pill.current.rotation.set(0, 0, Math.PI / 4);
    scene.add(pill.current);

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.current.aspect = innerWidth / innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const handlePan = (event) => {
      const deltaX = event.deltaX;
      const sensitivity = 0.0005;
      rotationalVelocity.current = deltaX * sensitivity;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sensitivity = 0.02;
      const targetRotation = initialRotation.current + scrollY * sensitivity;
      const deltaRotation = targetRotation - pill.current.rotation.y;

      pill.current.rotation.y += deltaRotation * 0.1;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (pill.current) {
        pill.current.rotation.y += rotationalVelocity.current;
        rotationalVelocity.current *= decayFactor;

        renderer.render(scene, camera.current);
      }
    };

    animate();

    const hammer = new Hammer(mount.current);
    hammer.on('pan', handlePan);

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (isMounted.current) {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        mount.current.removeChild(renderer.domElement);
      }
      isMounted.current = false;
    };
  }, [color1, color2, length, radius]);

  return <div ref={mount} />;
};

export default Pill;
