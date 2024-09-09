import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Papa from "papaparse";
import Model from "./Modal";
import Heatmap from "./heatmapcom";
import glbpath from "./assets/Duck.glb";

const App = () => {
  const glbPath = glbpath;
  const [csvData, setCsvData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const modelRef = React.useRef();

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch("./assets/raw_data.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvText = decoder.decode(result.value);
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          const exampleHeatmapData = results.data.map(() => Math.random());
          setHeatmapData(exampleHeatmapData);
        },
      });
    };

    loadCSV();
  }, []);

  const handleModelLoad = (model) => {
    console.log("Model loaded in App.js:", model);
    setIsModelLoaded(true);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model glbPath={glbPath} ref={modelRef} onLoad={handleModelLoad} />
          {isModelLoaded && (
            <Heatmap
              model={modelRef.current?.scene}
              heatmapData={heatmapData}
              csvData={csvData}
            />
          )}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};


export default App;