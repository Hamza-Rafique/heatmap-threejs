import { useMemo } from "react";
import * as THREE from "three";

const Heatmap = ({ model, heatmapData }) => {
 
  const material = useMemo(() => {
    const geometry = model.children[0].geometry;

    const colors = [
      ...Array(geometry.attributes.position.count).fill(0xffffff)
    ];
    const positions = geometry.attributes.position;
    const isPointInRegion = (x, z) => {
        const region = {
          name: "Tracker",
          minX: -108.8917,
          maxX: 84.31494,
          minZ: -36.81385,
          maxZ: 127.0695
        };
      
        return x >= region.minX && x <= region.maxX && z >= region.minZ && z <= region.maxZ;
      };
      
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i); 
      const z = positions.getZ(i);

      let color = new THREE.Color(0xffffff);

      if (isPointInRegion(x, z)) {
        // Map heatmap value to the region
        const value = heatmapData[i] || 0; // Heatmap value for this point
        color.setHSL(0.7 - value * 0.7, 1.0, 0.5); // Heatmap coloring based on value
      }

      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3)); // Apply color to vertices
    return new THREE.MeshBasicMaterial({ vertexColors: true });
  }, [heatmapData]);

  return <mesh material={material} geometry={model.children[0].geometry} />;
};

export default Heatmap;
