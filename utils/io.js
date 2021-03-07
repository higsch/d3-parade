const path = require('path');
const { createWriteStream } = require('fs');
const { timeParse } = require('d3');
const { hsv } = require('d3-hsv');

const parseDate = timeParse('%Y-%m-%dT%H:%M:%SZ');
const root = __dirname.replace('utils', '');

const _readJson = (filePath) => {
  return require(filePath);
};

const loadBlocks = async (blocksPath) => {
  console.log('=== Reading data...');

  const json = await _readJson(path.join(root, blocksPath));
  const parsedColors = json.map(d => ({
    ...d,
    created_at: parseDate(d.created_at),
    updated_at: parseDate(d.updated_at),
    colors: Object.keys(d.colors).map(c => ({
      hex: c,
      hsv: hsv(c),
      number: d.colors[c]
    }))
  }));

  const longColors = parsedColors.reduce((acc, cur) => {
    return [...acc, ...cur.colors.map(color => {
      const colors = Array.from({length: color.number}).fill({
        ...color,
        created_at: cur.created_at,
        updated_at: cur.updated_at,
        user_id: cur.userId
      });
      return colors;
    })];
  }, [])
  .flat();

  console.log('Done.');
  return longColors;
};

const exportToImage = (canvas, outputPath, name, format) => {
  return new Promise((resolve) => {
    const o = path.join(root, outputPath, `${name.replace(/[\s\\\/]/g, '_')}.${format}`);
    const out = createWriteStream(o);

    let stream;
    if (format === 'png') {
      stream = canvas.createPNGStream();
    } else if (format === 'jpg') {
      stream = canvas.createJPEGStream();
    }
    stream.pipe(out);

    out.on('close', () => {
      console.log('\n===',
                  `\nImage exported to ${o}`,
                  '\n===\n');
      resolve();
    });
  });
};

module.exports = {
  loadBlocks,
  exportToImage
};
