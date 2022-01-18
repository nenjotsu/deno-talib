let BearishInvertedHammer = require('../../lib/candlestick/BearishInvertedHammerStick').default;
let assert                = require('assert');
let drawCandleStick       = require('draw-candlestick');
let fs                    = require('fs');

let basicHammer = {
  open: [30.10],
  high: [52.06],
  close: [26.13],
  low: [26.13],
}

describe('Bearish Inverted Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BearishInvertedHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bearish Inverted Hammer (Single Stick) pattern', function() {
   let bearishInvertedHammer = new BearishInvertedHammer();
   let result = bearishInvertedHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bearish Inverted (Single Stick) Hammer');
  });
})
