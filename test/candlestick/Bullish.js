var Bullish = require('../../lib/candlestick/Bullish.js').default;
var bullish = require('../../lib/candlestick/Bullish.js').bullish;
var assert                  = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [21.12,21.48,21.80],//21.80
  close: [21.65,22.20,22.65],//22.65
  high: [21.83,22.40,22.80],//22.80
  low: [20.85,21.36,21.66],//21.66
}

describe('BullishPattern : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/Bullish.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish pattern', function() {
   var BullishPattern = new Bullish ();
   var result        = BullishPattern.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishPattern');
  });
  it('Check whether the supplied data has Bullish pattern if reversed and using static', function() {
   var BullishPattern = new Bullish ();
   input.open.reverse()
   input.high.reverse()
   input.low.reverse()
   input.close.reverse()
   input.reversedInput = true;
   var result        = bullish(input);
   assert.deepEqual(result, true, 'Invalid result for BullishPattern');
  });
})

