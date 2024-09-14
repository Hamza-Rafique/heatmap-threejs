import React from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const region = {
  minX: -108.8917,
  maxX: 84.31494,
  minZ: -36.81385,
  maxZ: 127.0695,
};

const Heatmap = ({  }) => {
  const heatmapData = Array.from({ length: 100 }, () => ({
    POSX: Math.random() * 100 - 50,  // Simulate random X positions between -50 and 50
    POSZ: Math.random() * 100 - 50,  // Simulate random Z positions between -50 and 50
  }));
  const width = Math.abs(region.maxX - region.minX);
  const height = Math.abs(region.maxZ - region.minZ);

  // Check if data is valid
  if (!heatmapData || heatmapData.length === 0) {
    console.log("Heatmap data is empty or invalid");
    return null;
  }

  // Initialize the data array for RGB texture
  const dataArray = new Uint8Array(width * height * 3);

  heatmapData.forEach(({ POSX, NPOSX, POSZ, NPOSZ }) => {
    const x = Math.floor(((POSX - region.minX) / (region.maxX - region.minX)) * (width - 1));
    const y = Math.floor(((POSZ - region.minZ) / (region.maxZ - region.minZ)) * (height - 1));

    const index = y * width + x;
    const i = index * 3;

    // Normalize and clamp the values to RGB ranges (0-255)
    const normalizedValueX = Math.min(255, Math.max(0, (POSX + NPOSX) / 2));
    const normalizedValueZ = Math.min(255, Math.max(0, (POSZ + NPOSZ) / 2));

    // Assign colors to the data array based on values
    dataArray[i] = normalizedValueX; // Red channel
    dataArray[i + 1] = normalizedValueZ; // Green channel
    dataArray[i + 2] = 128; // Blue channel
  });

  const heatmapTexture = new THREE.DataTexture(
    dataArray,
    width,
    height,
    THREE.RGBFormat
  );

  heatmapTexture.needsUpdate = true;

  return (
    <Plane args={[width, height]} position={[0, 0, 0]}>
      <meshBasicMaterial map={heatmapTexture} wireframe={false} color={"#049ef4"} />
    </Plane>
  );
};

export default Heatmap;
