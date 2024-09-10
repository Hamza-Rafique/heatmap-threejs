import React from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const Heatmap = ({ heatmapData }) => {
  // Assuming heatmapData is an array of objects with POSX, NPOSX, POSZ, NPOSZ
  console.log(heatmapData, "heatmapData");

  // Define the size of the heatmap grid
  const width = 10; // Set according to your data
  const height = 10; // Set according to your data

  // Initialize an empty array to store the pixel data
  const dataArray = new Uint8Array(width * height * 3); // For RGB

  // Populate the dataArray based on heatmapData
  heatmapData.forEach(({ POSX, NPOSX, POSZ, NPOSZ }, index) => {
    const x = POSX; // Calculate position based on your data
    const y = NPOSX; // Calculate position based on your data

    // You may need to adjust how you calculate values for the heatmap here
    const value = (POSZ + NPOSZ) / 2; // Example calculation

    const i = (y * width + x) * 3;
    dataArray[i] = value; // Red
    dataArray[i + 1] = value; // Green
    dataArray[i + 2] = 0; // Blue (set to 0 for now)
  });

  const heatmapTexture = new THREE.DataTexture(
    dataArray,
    width,
    height,
    THREE.RGBFormat
  );

  heatmapTexture.needsUpdate = true;

  return (
    <Plane args={[5, 5]} position={[0, 0, 0]}>
      <meshBasicMaterial map={heatmapTexture} transparent />
    </Plane>
  );
};

export default Heatmap;
