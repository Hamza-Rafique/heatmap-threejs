import React, { useEffect } from 'react';

const Heatmap = ({ model, heatmapData, csvData }) => {
  useEffect(() => {
    console.log("Received model in Heatmap:", model);
    console.log("Heatmap data:", heatmapData);
    console.log("CSV data:", csvData);
    
    if (model) {
      // Implement the heatmap rendering logic here
      // Example: Add heatmap points or overlay on the model
    }
  }, [model, heatmapData, csvData]);

  return null; // Render heatmap or related UI here
};

export default Heatmap;
