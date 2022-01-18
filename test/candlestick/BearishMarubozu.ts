let BearishMarubozu = require('../../lib/candlestick/BearishMarubozu').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  close: [30.50],
  open: [31.23],
  high: [31.23],
  low: [30.50],
}

describe('BearishMarubozu : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishMarubozu.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishMarubozu pattern', function() {
   let bearishMarubozu = new BearishMarubozu();
   let result = bearishMarubozu.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishMarubozu');
  });
})
