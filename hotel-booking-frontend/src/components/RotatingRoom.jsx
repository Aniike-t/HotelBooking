import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const Model = ({ gltf }) => {
  const gltfRef = useRef();

  useFrame(() => {
    if (gltfRef.current) {
      gltfRef.current.rotation.x += 0; // Adjust the rotation speed as needed
      gltfRef.current.rotation.y += 0.00075;
    }
  });

  return (
    <group ref={gltfRef} scale={[0.0085, 0.0085, 0.0085]}> {/* Scale the model down */}
      <primitive object={gltf.scene}>
        <mesh visible={false} />
      </primitive>
    </group>
  );
};

const GlbViewer = () => {
  const [gltf, setGltf] = React.useState(null);

  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/lowroom.glb', (gltf) => {
      setGltf(gltf);
    });
  }, []);

  return (
    <div style={{ height: '90vmin', width: '90vmin' }}>
      <Canvas camera={{ position: [0, 0, 5] }} style={{ margin : '0 auto' }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[0, 0, 0]} />
        {gltf && <Model gltf={gltf} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default GlbViewer;
