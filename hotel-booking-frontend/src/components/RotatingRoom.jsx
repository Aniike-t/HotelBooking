import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const RotatingModel = () => {
  const modelPath = '/lowroom.glb'; // Replace with the actual path to your 3D model
  const container = useRef();
  const model = useRef();

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current.appendChild(renderer.domElement);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      model.current = gltf.scene;
      scene.add(model.current);

      // Set up the model's initial position and scale
      model.current.rotation.set(0, Math.PI, 0); // Rotate the model if needed
      model.current.scale.set(0.01, 0.01, 0.01); // Adjust the scale as needed
    });

    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1); // Adjust light position as needed
    scene.add(directionalLight);

    // Set up the animation
    const animate = () => {
      if (model.current) {
        model.current.rotation.y += 0.005; // Rotate the model
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Clean up when the component unmounts
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, [modelPath]);

  return <div ref={container} style={{ width: '100%', height: '100vh' }} />;
};

export default RotatingModel;
