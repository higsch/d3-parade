const { scaleLinear, scaleOrdinal, extent, groups, descending } = require('d3');

const defineRadialScales = (data, width, height, margin) => {
  const dateScale = scaleLinear()
    .domain(extent(data, d => d.created_at))
    .range([0, Math.min(width, height) / 2 - margin]);

  const segmentScale = scaleLinear()
    .domain([0, 360])
    .range([0, 2 * Math.PI]);

  console.log('Date range: ', dateScale.domain().map(d => new Date(d)));

  return {
    dateScale,
    segmentScale
  }
};

const defineBarScales = (userData, width, height, margin) => {
  const totalNumColors = userData.reduce((acc, cur) => acc + cur.n, 0);
  const userIndices = userData.map(d => d.index);
  let lastPos = margin;
  const userScale = scaleOrdinal()
    .domain(userIndices)
    .range(userIndices.map(userIndex => {
      const n = userData.find(d => d.index === userIndex).n;
      const start = lastPos;
      const end = start + (height - 2 * margin) * n / totalNumColors;
      lastPos = end;
      return {
        start,
        end,
        step: (end - start) / (n + 1)
      }
    }));

  const widthScale = scaleLinear()
    .domain([0, 1])
    .range([margin, width - margin]);

  return {
    userScale,
    widthScale
  };
};

module.exports = {
  defineRadialScales,
  defineBarScales
};
