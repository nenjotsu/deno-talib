let BullishHarami = require('../../lib/candlestick/BullishHarami').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,24.1],
  low: [21.7,23.07],
}

describe('BullishHarami : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishHarami.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishHarami pattern', function() {
   let bullishHarami = new BullishHarami ();
   let result = bullishHarami.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishHarami')
   
  });
})

