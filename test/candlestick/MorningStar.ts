let MorningStar = require('../../lib/candlestick/MorningStar').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

// let input = {
//   open: [22.20,19.80,20.70],
//   high: [22.50,20.45,21.82],
//   close: [20.80,20.30,21.58],
//   low: [20.65,19.60,20.40]
// }

let input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,19.80,21.58],
  low: [20.65,19.60,20.40]
}

describe('MorningStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/MorningStar.png',imageBuffer);
  });
  it('Check whether the supplied data has MorningStar pattern', function() {
   let morningStar = new MorningStar ();
   let result      = morningStar.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for MorningStar');
  });
})



