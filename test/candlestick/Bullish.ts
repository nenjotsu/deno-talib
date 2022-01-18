let Bullish = require('../../lib/candlestick/Bullish.js').default;
let bullish = require('../../lib/candlestick/Bullish.js').bullish;
let assert                  = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [21.12,21.48,21.80],//21.80
  close: [21.65,22.20,22.65],//22.65
  high: [21.83,22.40,22.80],//22.80
  low: [20.85,21.36,21.66],//21.66
}

describe('BullishPattern : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/Bullish.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish pattern', function() {
   let BullishPattern = new Bullish ();
   let result        = BullishPattern.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishPattern');
  });
  it('Check whether the supplied data has Bullish pattern if reversed and using static', function() {
   let BullishPattern = new Bullish ();
   input.open.reverse()
   input.high.reverse()
   input.low.reverse()
   input.close.reverse()
   input.reversedInput = true;
   let result        = bullish(input);
   assert.deepEqual(result, true, 'Invalid result for BullishPattern');
  });
})

