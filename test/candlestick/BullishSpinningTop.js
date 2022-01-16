let BullishSpinningTop = require('../../lib/candlestick/BullishSpinningTop').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [20.50],
  high: [20.87],
  close: [20.62],
  low: [20.23],
  
}

describe('BullishSpinningTop : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishSpinningTop.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishSpinningTop pattern', function() {
   let bullishSpinningTop = new BullishSpinningTop ();
   let result = bullishSpinningTop.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishSpinningTop')
   
  });
})

