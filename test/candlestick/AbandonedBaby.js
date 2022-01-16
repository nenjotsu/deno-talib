let AbandonedBaby = require('../../lib/candlestick/AbandonedBaby').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [31.10,26.18,27.47],
  high: [31.80,26.91,30.94],
  close: [28.10,26.18,30.62],
  low: [27.50,25.40,27.03]
}

describe('AbandonedBaby : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/abandonedbaby.png',imageBuffer);
  });
  it('Check whether the supplied data has AbandonedBaby pattern', function() {
   let abandonedBaby = new AbandonedBaby ();
   let result        = abandonedBaby.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for AbandonedBaby');
  });
})



