let MorningDojiStar = require('../../lib/candlestick/MorningDojiStar').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,20.30,21.58],
  low: [20.65,20.10,20.40]
}

describe('MorningDojiStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/MorningDojiStar.png',imageBuffer);
  });
  it('Check whether the supplied data has MorningDojiStar pattern', function() {
   let morningDojiStar = new MorningDojiStar ();
   let result      = morningDojiStar.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for MorningDojiStar');
  });
})



