let GraveStoneDoji = require('../../lib/candlestick/GraveStoneDoji').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [30.10],
  high: [36.13],
  close: [30.13],
  low: [30.12],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

describe('GraveStoneDoji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/graveStoneDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has GraveStoneDoji pattern', function() {
   let graveStoneDoji = new GraveStoneDoji();
   let result = graveStoneDoji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for GraveStoneDoji');
  });
  it('Check whether the supplied data has GraveStoneDoji pattern', function() {
   let graveStoneDoji = new GraveStoneDoji();
   let result = graveStoneDoji.hasPattern(inputDot);
   assert.deepEqual(result, false, 'Invalid result for a single point Doji');
  });
})
