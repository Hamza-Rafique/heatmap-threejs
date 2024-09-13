import React from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const region = {
  minX: -108.8917,
  maxX: 84.31494,
  minZ: -36.81385,
  maxZ: 127.0695,
};

const Heatmap = ({ heatmapData }) => {
  console.log(heatmapData, "heatmapData");

  const width = Math.abs(region.maxX - region.minX);
  const height = Math.abs(region.maxZ - region.minZ);

  const dataArray = new Uint8Array(width * height * 3); // For RGB

  heatmapData.forEach(({ POSX, NPOSX, POSZ, NPOSZ }) => {
    const x = ((POSX - region.minX) / width) * (width - 1);
    const y = ((POSZ - region.minZ) / height) * (height - 1);

    const index = Math.floor(y) * width + Math.floor(x);
    const i = index * 3;

    const value = (POSZ + NPOSZ) / 2; // Example value calculation

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
    <Plane args={[width, height]} position={[0, 0, 0]}>
      <meshBasicMaterial map={heatmapTexture} transparent />
    </Plane>
  );
};

export default Heatmap;
