let BullishMarubozu = require('../../lib/candlestick/BullishMarubozu').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  close: [31.23],
  open: [30.50],
  high: [31.23],
  low: [30.50],
}

describe('BullishMarubozu : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishMarubozu.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishMarubozu pattern', function() {
   let bullishMarubozu = new BullishMarubozu();
   let result = bullishMarubozu.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishMarubozu');
  });
})
