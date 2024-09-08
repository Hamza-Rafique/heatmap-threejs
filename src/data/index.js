const gazeData = [
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 5, value: 1 },
  { x: 1, y: 5, value: 1 },
];

function processGazeData(data) {
  return data.map((point) => ({
    x: point.POSX,
    y: point.POSZ,
    value: 1, 
  }));
}

const processedData = processGazeData(gazeData);

export default processedData