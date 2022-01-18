let PiercingLine = require('../../lib/candlestick/PiercingLine').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [42.70, 41.33],
  high: [42.82,42.50],
  close: [41.60,42.34],
  low: [41.45,41.15],
  
}

describe('PiercingLine : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/PiercingLine.png',imageBuffer);
  });
  it('Check whether the supplied data has PiercingLine pattern', function() {
   let piercingLine = new PiercingLine ();
   let result = piercingLine.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for PiercingLine')
   
  });
})

