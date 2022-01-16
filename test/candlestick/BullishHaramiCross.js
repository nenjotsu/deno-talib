let BullishHaramiCross = require('../../lib/candlestick/BullishHaramiCross').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,23.45],
  low: [21.7,23.07],
}

describe('BullishHaramiCross: ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishHaramiCross.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishHaramiCross pattern', function() {
   let bullishHaramiCross = new BullishHaramiCross ();
   let result = bullishHaramiCross.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishHaramiCross')
   
  });
})

