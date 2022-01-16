let BullishEngulfingPattern = require('../../lib/candlestick/BullishEngulfingPattern').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

describe('BullishEngulfingPattern : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/bullishEngulfingPattern.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishEngulfingPattern pattern', function() {
   let bullishEngulfingPattern = new BullishEngulfingPattern ();
   let result        = bullishEngulfingPattern.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishEngulfingPattern');
   
  });
})

