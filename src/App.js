import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Papa from "papaparse";
import Model from "./Modal";
import Heatmap from "./HeatMap";
import glbpath from "./assets/underground_parking_lot.glb";

const App = () => {
  const glbPath = glbpath;
  const [csvData, setCsvData] = useState([]);

  const heatmapData = new Array(1000).fill(Math.random());
  const modelRef = React.useRef();

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch("./assets/raw_data.csv");
      console.log(response , 'response')
      const reader = response.body.getReader();
      console.log(reader  , 'reader ')

      const result = await reader.read();
      console.log(result  , 'result ')

      const decoder = new TextDecoder("utf-8");
      const csvText = decoder.decode(result.value);
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);  // Store the parsed CSV data
        },
      });
    };
    console.log(csvData, 'csvData')
    loadCSV();
  }, []);

  console.log(csvData, 'csvData')

  return (
    <div style={{ height: "100vh" }}>
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model glbPath={glbPath} ref={modelRef} />
        {modelRef.current && csvData.length > 0 && (
          <Heatmap model={modelRef.current.scene} heatmapData={heatmapData} csvData={csvData} />
        )}
      </Suspense>
      <OrbitControls />
    </Canvas>
    </div>
  );
};

export default App;
