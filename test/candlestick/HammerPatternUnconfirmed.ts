let HammerPattern   = require('../../lib/candlestick/HammerPatternUnconfirmed').default;
let assert          = require('assert');
let drawCandleStick = require('draw-candlestick');
let fs              = require('fs');

let hammerData = [
  {
    name: 'Bearish',
    data: {
      open: [44.00, 40.90, 36.00, 33.10, 30.10],
      high: [45.00, 41.80, 37.60, 35.90, 30.10],
      close: [42.00, 36.00, 33.10, 29.50, 26.13],
      low: [38.00, 28.00, 27.70, 26.90, 10.06],
    },
  },
  {
    name: 'Bearish Inverted',
    data: {
      open: [44.00, 40.90, 36.00, 33.10, 29.10],
      high: [45.00, 41.80, 37.60, 35.90, 36.10],
      close: [42.00, 36.00, 33.10, 29.50, 26.13],
      low: [38.00, 28.00, 27.70, 26.90, 26.13],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [44.00, 40.90, 36.00, 33.10, 26.13],
      high: [45.00, 41.80, 37.60, 35.90, 30.10],
      close: [42.00, 36.00, 33.10, 29.50, 30.10],
      low: [38.00, 28.00, 27.70, 26.90, 10.06],
    },
  },
  {
    name: 'Bullish Inverted',
    data: {
      open: [44.00, 40.90, 36.00, 33.10, 26.13],
      high: [45.00, 41.80, 37.60, 35.90, 36.10],
      close: [42.00, 36.00, 33.10, 29.50, 29.10],
      low: [38.00, 28.00, 27.70, 26.90, 26.13],
    },
  },
];

describe('Hammer Pattern (Unconfirmed) : ', function() {
   before(function() {
    hammerData.forEach((patternSet) => {
      let imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}HammerPatternUnconfirmed.png`,imageBuffer);
    });
  });
  hammerData.forEach((patternSet) => {
    it(`Check whether the supplied data has Hammer Pattern (Unconfirmed): ${patternSet.name}`, function() {
      let Hammer = new HammerPattern();
      let result = Hammer.hasPattern(patternSet.data);
      assert.deepEqual(result, true, `Invalid result for Hammer Pattern (Unconfirmed): ${patternSet.name}`);
     });
  });
})
