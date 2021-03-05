const { scaleLinear, scaleSqrt, extent, max } = require('d3');

const defineScales = (data, width, height, margin) => {
  const dateScale = scaleLinear()
    .domain(extent(data, d => d.created_at))
    .range([0, Math.min(width, height) / 2 - margin]);
  
  const numberScale = scaleSqrt()
    .domain([0, Math.min(1, max(data, d => d.number))])
    .range([0, Math.min(width, height) / 700])
    .clamp(true);

  return {
    dateScale,
    numberScale
  }
};

module.exports = {
  defineScales
};
