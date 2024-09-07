import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./Modal";
import Heatmap from "./HeatMap";
import map from "../src/assets/raw_data.csv";

const App = () => {
  const glbPath ="../src/assets/Duck.glb";
  const heatmapData = new Array(1000).fill(Math.random());
  const modelRef = React.useRef();

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model glbPath={glbPath} ref={modelRef} />
        {modelRef.current && (
          <Heatmap model={modelRef.current.scene} heatmapData={heatmapData} />
        )}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default App;
