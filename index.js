const config = require('./config');
const { loadBlocks, exportToImage } = require('./utils/io');
const { defineScales } = require('./utils/scales');

const { radialForceSimulation } = require('./utils/force');

const { initCanvas, drawRadialCircles } = require('./utils/canvas');

(async function main() {
  // load the data
  const data = await loadBlocks(config.blocksPath);

  // set the scales
  const { dateScale, numberScale } = defineScales(data, config.width, config.height, config.margin);

  const forcedData = await radialForceSimulation(data, dateScale, numberScale);

  // init canvas
  const [ canvas, ctx ] = initCanvas(config.width, config.height, '#000000');

  // draw circles
  drawRadialCircles(ctx, forcedData, numberScale, config.opacity);

  // export image
  await exportToImage(canvas, config.outputPath, 'radial', config.outputFormat);
})();
