import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./Modal";
import Heatmap from "./HeatMap";
import glbpath from "./assets/underground_parking_lot.glb";

const App = () => {
  const glbPath = glbpath;
  const heatmapData = new Array(1000).fill(Math.random());
  const modelRef = React.useRef();

  return (
    <div style={{ height: "100vh" }}>
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
    </div>
  );
};

export default App;
