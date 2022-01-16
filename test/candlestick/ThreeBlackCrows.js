let ThreeBlackCrows = require('../../lib/candlestick/ThreeBlackCrows').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [21.65,21.48,21.25],
  high: [21.82,21.57,21.35],
  close: [21.32,21.10,20.70],
  low: [21.25,20.97,20.60]
}

describe('ThreeBlackCrows : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeBlackCrows.png',imageBuffer);
  });
  it('Check whether the supplied data has ThreeBlackCrows pattern', function() {
   let threeBlackCrows = new ThreeBlackCrows ();
   let result      = threeBlackCrows.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for ThreeBlackCrows');
  });
})



