import { useMemo } from "react";
import * as THREE from "three";

const Heatmap = ({ model, heatmapData, csvData }) => {
  console.log(model, 'model')
  const material = useMemo(() => {
    if (!model || !model.children || !model.children[0].geometry) {
      console.error("Model or geometry not available yet.");
      return null;
    }

    const geometry = model.children[0].geometry;
    const colors = [ ];
    const positions = geometry.attributes.position;

    if (!positions) {
      console.error("Position attributes not found in geometry.");
      return null;
    }

    const isPointInRegion = (x, z, posX, posZ) => {
      return x === posX && z === posZ;
    };

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      let color = new THREE.Color(0xffffff);
      const matchingPoint = csvData.find((point) =>
        isPointInRegion(x, z, parseFloat(point.POSX), parseFloat(point.POSZ))
      );

      if (matchingPoint) {
        const value = heatmapData[i] || 0;
        color.setHSL(0.7 - value * 0.7, 1.0, 0.5);
      }

      // Push color to colors array
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    // Return the material with vertex colors enabled
    return new THREE.MeshBasicMaterial({ vertexColors: true });
  }, [heatmapData, csvData, model]);

  if (!material) return null; // Return nothing if material is not ready

  return <mesh material={material} geometry={model.children[0].geometry} />;
};

export default Heatmap;
