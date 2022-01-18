let HammerPattern   from '../../src/candlestick/HammerPattern').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let hammerData = [
  {
    name: 'Bearish',
    data: {
      open: [40.90, 36.00, 33.10, 30.10, 26.13],
      high: [41.80, 37.60, 35.90, 30.10, 33.60],
      close: [36.00, 33.10, 29.50, 26.13, 31.00],
      low: [28.00, 27.70, 26.90, 10.06, 25.90],
    },
  },
  {
    name: 'Bearish Inverted',
    data: {
      open: [40.90, 36.00, 33.10, 29.10, 26.13],
      high: [41.80, 37.60, 35.90, 36.10, 33.60],
      close: [36.00, 33.10, 29.50, 26.13, 31.00],
      low: [28.00, 27.70, 26.90, 26.13, 25.90],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [40.90, 36.00, 33.10, 26.13, 30.10],
      high: [41.80, 37.60, 35.90, 30.10, 33.60],
      close: [36.00, 33.10, 29.50, 30.10, 32.30],
      low: [28.00, 27.70, 26.90, 10.06, 25.90],
    },
  },
  {
    name: 'Bullish Inverted',
    data: {
      open: [40.90, 36.00, 33.10, 26.13, 29.10],
      high: [41.80, 37.60, 35.90, 36.10, 33.60],
      close: [36.00, 33.10, 29.50, 29.10, 31.00],
      low: [28.00, 27.70, 26.90, 26.13, 25.90],
    },
  },
];

Deno.test('Hammer Pattern : ', function() {
   before(function() {
    hammerData.forEach((patternSet) => {
      let imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}HammerPattern.png`,imageBuffer);
    });
  });
  hammerData.forEach((patternSet) => {
    Deno.test(`Check whether the supplied data has Hammer Pattern: ${patternSet.name}`, function() {
      let Hammer = new HammerPattern();
      let result = Hammer.hasPattern(patternSet.data);
      assertEquals(result, true, `Invalid result for Hammer Pattern: ${patternSet.name}`);
     });
  });
})
