let TweezerTop      = require('../../lib/candlestick/TweezerTop').default;
let assert          = require('assert');
let drawCandleStick = require('draw-candlestick');
let fs              = require('fs');

let testData = {
  open: [29.50, 33.10, 36.00, 40.90, 42.80],
  high: [35.90, 37.60, 41.80, 43.10, 43.10],
  close: [33.10, 36.00, 40.90, 42.80, 38.05],
  low: [26.90, 27.70, 28.00, 39.10, 37.50],
};

describe('Tweezer Top : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(testData);
    fs.writeFileSync(`${__dirname}/images/TweezerTop.png`,imageBuffer);
  });
  it(`Check whether the supplied data has Tweezer Top`, function() {
    let tweezerTop = new TweezerTop();
    let result     = tweezerTop.hasPattern(testData);
    assert.deepEqual(result, true, `Invalid result for Tweezer Top`);
  });
})
