// Computers.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<CanvasLoader />}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.5 : 0.75} // Adjust scale for mobile
          position={[0, -3, -2]} // Adjust position
        />
      </Suspense>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand" // Optimize frameloop
      shadows
      dpr={window.devicePixelRatio} // Use device pixel ratio
      camera={{ position: [20, 3, 5], fov: 25 }}
    >
      <OrbitControls enableZoom={false} />
      <Computers isMobile={isMobile} />
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
