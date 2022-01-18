let BullishHammer   = require('../../lib/candlestick/BullishHammerStick').default;
let assert          = require('assert');
let drawCandleStick = require('draw-candlestick');
let fs              = require('fs');

let basicHammer = {
  open: [26.13],
  high: [30.10],
  close: [30.10],
  low: [10.06],
}

describe('Bullish Hammer (Single Stick): ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish Hammer (Single Stick) pattern', function() {
   let bullishHammer = new BullishHammer();
   let result = bullishHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bullish Hammer (Single Stick)');
  });
})
