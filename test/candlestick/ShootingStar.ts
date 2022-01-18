let ShootingStar    from '../../src/candlestick/ShootingStar').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let shootingStarData = [
  {
    name: 'Bearish',
    data: {
      open: [29.50, 33.10, 36.00, 42.80, 40.90],
      high: [35.90, 37.60, 41.80, 48.80, 43.10],
      close: [33.10, 36.00, 40.90, 40.90, 38.05],
      low: [26.90, 27.70, 28.00, 40.90, 37.50],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [29.50, 33.10, 36.00, 40.90, 40.90],
      high: [35.90, 37.60, 41.80, 48.80, 43.10],
      close: [33.10, 36.00, 40.90, 42.80, 38.05],
      low: [26.90, 27.70, 28.00, 40.90, 37.50],
    },
  },
];

Deno.test('Shooting Star : ', function() {
   before(function() {
    shootingStarData.forEach((patternSet) => {
      let imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}ShootingStar.png`,imageBuffer);
    });
  });
  shootingStarData.forEach((patternSet) => {
    Deno.test(`Check whether the supplied data has Shooting Star: ${patternSet.name}`, function() {
      let hangingMan = new ShootingStar();
      let result = hangingMan.hasPattern(patternSet.data);
      assertEquals(result, true, `Invalid result for Shooting Star: ${patternSet.name}`);
     });
  });
})
