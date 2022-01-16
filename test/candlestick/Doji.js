let Doji = require('../../lib/candlestick/Doji').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [30.10],
  high: [32.10],
  close: [30.13],
  low: [28.10],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

describe('Doji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/doji.png',imageBuffer);
  });
  it('Check whether the supplied data has Doji pattern', function() {
   let doji = new Doji();
   let result = doji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for Doji');
  });
  it('Check whether the supplied data has Doji pattern', function() {
   let doji = new Doji();
   let result = doji.hasPattern(inputDot);
   assert.deepEqual(result, true, 'Invalid result for a single point Doji');
  });
})
