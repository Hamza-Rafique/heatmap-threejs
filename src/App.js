import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Papa from "papaparse";
import Model from "./Modal";
import Heatmap from "./heatmapcom";
import glbpath from "./assets/MainScene/MainScene.glb";

const App = () => {
  const glbPath = glbpath;
  const [csvData, setCsvData] = useState([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const modelRef = React.useRef();

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/raw_data.csv");

        // Check if the response is valid
        if (!response.ok) {
          throw new Error(
            `Error fetching the CSV file: ${response.statusText}`
          );
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvText = decoder.decode(result.value);

        // Log the raw CSV data for debugging
        console.log(csvText);

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setCsvData(results.data);
            console.log("Parsed CSV Data:", results.data);
          },
        });
      } catch (error) {
        console.error("Error loading the CSV:", error);
      }
    };

    loadCSV();
  }, []);

  console.log(csvData, "csvData");

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
          {isModelLoaded && <Heatmap heatmapData={csvData} />}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
