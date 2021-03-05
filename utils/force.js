const { forceSimulation, forceRadial } = require('d3');

const radialForceSimulation = (data, dateScale, numberScale) => {
  return new Promise((resolve) => {
    console.log('=== Running force layout...');
    let dataCopy = [...data];

    forceSimulation()
      .nodes(dataCopy)
      .force('center', forceRadial().radius(d => dateScale(d.created_at)))
      .on('end', () => {
        console.log('Done.');
        resolve(dataCopy);
      })
      .tick(300);
  });
};

module.exports = {
  radialForceSimulation
};
