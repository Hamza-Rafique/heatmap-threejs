import React from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

// Define your region data
const region = {
  minX: -108.8917,
  maxX: 84.31494,
  minZ: -36.81385,
  maxZ: 127.0695
};

const Heatmap = ({ heatmapData }) => {
  console.log(heatmapData, "heatmapData");

  // Calculate width and height based on the region data
  const width = Math.abs(region.maxX - region.minX);
  const height = Math.abs(region.maxZ - region.minZ);

  // Initialize an empty array to store the pixel data
  const dataArray = new Uint8Array(width * height * 3); // For RGB

  // Populate the dataArray based on heatmapData
  heatmapData.forEach(({ POSX, NPOSX, POSZ, NPOSZ }) => {
    // Normalize the coordinates to fit within the region bounds
    const x = (POSX - region.minX) / width * (width - 1); // Normalized x position
    const y = (POSZ - region.minZ) / height * (height - 1); // Normalized y position

    // Calculate the index for the data array
    const index = Math.floor(y) * width + Math.floor(x);
    const i = index * 3;

    // Calculate heatmap value
    const value = (POSZ + NPOSZ) / 2; // Example value calculation

    // Set RGB values in the dataArray
    dataArray[i] = value; // Red
    dataArray[i + 1] = value; // Green
    dataArray[i + 2] = 0; // Blue (set to 0 for now)
  });

  // Create a texture from the dataArray
  const heatmapTexture = new THREE.DataTexture(
    dataArray,
    width,
    height,
    THREE.RGBFormat
  );

  heatmapTexture.needsUpdate = true;

  return (
    <Plane args={[width, height]} position={[0, 0, 0]}>
      <meshBasicMaterial map={heatmapTexture} transparent />
    </Plane>
  );
};

export default Heatmap;
