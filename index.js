const config = require('./config');
const { loadBlocks, exportToImage } = require('./utils/io');
const { defineRadialScales, defineBarScales } = require('./utils/scales');

const { initCanvas, drawRadialLines, drawBarLines } = require('./utils/canvas');
const { getTopUsers } = require('./utils/math');

const buildCircle = async (data) => {
  // set scales
  const { dateScale, segmentScale } = defineRadialScales(data, config.radialWidth, config.height, config.margin);
  // init canvas
  const [ canvas, ctx ] = initCanvas(config.radialWidth, config.height, config.background, true);
  // draw circles
  drawRadialLines(ctx, data, segmentScale, dateScale, config.radialOpacity, config.radialLineWidth);
  // export image
  await exportToImage(canvas, config.outputPath, 'radial', config.outputFormat);
};

const buildBar = async (data) => {
  // aggregate data
  const userData = getTopUsers(data, config.topUsers);
  // set scales
  const { userScale, widthScale } = defineBarScales(userData, config.barWidth, config.height, config.margin);
  // init canvas
  const [ canvas, ctx ] = initCanvas(config.barWidth, config.height, config.background, false);
  // draw lines
  drawBarLines(ctx, userData, widthScale, userScale, config.barOpacity, config.barLineWidth);
  // report top users
  console.log(userData.map(d => ({user_id: d.user_id, n: d.n})));
  // export image
  await exportToImage(canvas, config.outputPath, 'bar', config.outputFormat);
};

(async function main() {
  // output config
  console.log('=== Config');
  console.log(config);

  // load data
  const data = await loadBlocks(config.blocksPath);

  // build "zero" circle
  await buildCircle(data);

  // build "one" bar
  await buildBar(data);
})();
