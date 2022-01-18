let EveningStar = require('../../lib/candlestick/EveningStar').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.70,22.05],
  close: [21.30,22.52,19.45],
  low: [18.13,21.87,19.30]
}

describe('EveningStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/EveningStar.png',imageBuffer);
  });
  it('Check whether the supplied data has EveningStar pattern', function() {
   let eveningStar = new EveningStar ();
   let result        = eveningStar.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for EveningStar');
  });
})



