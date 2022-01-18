let EveningDojiStar = require('../../lib/candlestick/EveningDojiStar').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.40,22.05],
  close: [21.30,22.22,19.45],
  low: [18.13,21.87,19.30]
}

describe('EveningDojiStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/EveningDojiStar.png',imageBuffer);
  });
  it('Check whether the supplied data has EveningDojiStar pattern', function() {
   let eveningDojiStar = new EveningDojiStar ();
   let result        = eveningDojiStar.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for EveningDojiStar');
  });
})



