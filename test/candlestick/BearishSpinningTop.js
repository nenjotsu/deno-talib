let BearishSpinningTop = require('../../lib/candlestick/BearishSpinningTop').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [20.62],
  high: [20.75],
  close: [20.50],
  low: [20.34],
  
}

describe('BearishSpinningTop : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishSpinningTop.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishSpinningTop pattern', function() {
   let bearishSpinningTop = new BearishSpinningTop ();
   let result = bearishSpinningTop.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishSpinningTop')
   
  });
})

