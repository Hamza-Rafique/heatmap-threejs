import React, { useMemo } from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const region = {
  minX: -108.8917,
  maxX: 84.31494,
  minZ: -36.81385,
  maxZ: 127.0695,
};

const Heatmap = ({ heatmapData }) => {
  const data = heatmapData;
  const width = Math.abs(region.maxX - region.minX); 
  const height = Math.abs(region.maxZ - region.minZ); 
  const colorScale = new THREE.Color();

  const heatmap = useMemo(() => {
    return data.map((point, index) => {
      const normalizedX =
        region.minX +
        ((point.POSX - 0) / (10 - 0)) * (region.maxX - region.minX);
      const normalizedZ =
        region.minZ +
        ((point.POSZ - 0) / (10 - 0)) * (region.maxZ - region.minZ); 
      const intensity = point.NPOSX / 150; 
      const color = colorScale.setHSL(0.7 * (1 - intensity), 1, 0.5).getHex();

      return (
        <mesh key={index} position={[normalizedX, 0.5, normalizedZ]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color={color} />
        </mesh>
      );
    });
  }, [data]);

  return (
    <>
      <Plane args={[width, height]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </Plane>
      {heatmap}

    </>
  );
};

export default Heatmap;
