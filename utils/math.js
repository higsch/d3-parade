const { groups, descending } = require('d3');

const getTopUsers = (data, top) => {
  const userData = groups(data, d => d.user_id)
    .map(d => {
      const uniqueColors = [...new Set(d[1].map(dd => dd.hex))]
        .map(dd => ({
          hex: dd,
          hsv: d[1].find(ddd => ddd.hex === dd).hsv
        }))
        .filter(dd => !isNaN(dd.hsv.h))
        .sort((a, b) => descending(a.hsv.h, b.hsv.h));

      return {
        user_id: d[0],
        uniqueColors,
        n: uniqueColors.length
      };
    })
  .sort((a, b) => descending(a.n, b.n))
  .map((d, i) => ({
    index: i,
    ...d
  }))
  .slice(0, top);

  return userData;
};

module.exports = {
  getTopUsers
};
