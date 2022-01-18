let ThreeWhiteSoldiers = require('../../lib/candlestick/ThreeWhiteSoldiers').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [21.12,21.48,21.80],
  close: [21.65,22.20,22.65],
  high: [21.83,22.40,22.80],
  low: [20.85,21.36,21.66]
}

describe('ThreeWhiteSoldiers : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeWhiteSoldiers.png',imageBuffer);
  });
  it('Check whether the supplied data has ThreeWhiteSoldiers pattern', function() {
   let threeWhiteSoldiers = new ThreeWhiteSoldiers ();
   let result      = threeWhiteSoldiers.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for ThreeWhiteSoldiers');
  });
})



