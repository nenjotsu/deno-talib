let DownsideTasukiGap = require('../../lib/candlestick/DownsideTasukiGap').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [45.00, 33.45, 30.20],
  high: [46.20,34.70,36.63],
  close:[41.20,29.31,36.28],
  low: [38.56,28,29.80],
  
}

describe('DownsideTasukiGap : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/downsideTasukiGap.png',imageBuffer);
  });
  it('Check whether the supplied data has DownsideTasukiGap pattern', function() {
   let downsideTasukiGap = new DownsideTasukiGap ();
   let result        = downsideTasukiGap.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for DownsideTasukiGap');
  });
})

