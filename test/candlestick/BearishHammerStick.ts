let BearishHammer   = require('../../lib/candlestick/BearishHammerStick').default;
let assert          = require('assert');
let drawCandleStick = require('draw-candlestick');
let fs              = require('fs');

let basicHammer = {
  open: [30.10],
  high: [30.10],
  close: [26.13],
  low: [10.06],
}

describe('Bearish Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BearishHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bearish Hammer (Single Stick) pattern', function() {
   let bearishHammer = new BearishHammer();
   let result = bearishHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bearish Hammer (Single Stick)');
  });
})
