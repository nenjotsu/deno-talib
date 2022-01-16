let BullishInvertedHammer = require('../../lib/candlestick/BullishInvertedHammerStick').default;
let assert                = require('assert');
let drawCandleStick       = require('draw-candlestick');
let fs                    = require('fs');

let basicHammer = {
  open: [26.13],
  high: [52.06],
  close: [30.10],
  low: [26.13],
}

describe('Bullish Inverted Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishInvertedHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish Inverted Hammer (Single Stick) pattern', function() {
   let bullishInvertedHammer = new BullishInvertedHammer();
   let result = bullishInvertedHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bullish Inverted Hammer (Single Stick)');
  });
})
