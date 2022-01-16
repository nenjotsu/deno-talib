let DragonFlyDoji = require('../../lib/candlestick/DragonFlyDoji').default;
let assert = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');

let input = {
  open: [30.10],
  high: [30.10],
  close: [30.13],
  low: [28.10],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

describe('DragonFlyDoji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/dragonFlyDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has DragonFlyDoji pattern', function() {
   let dragonFlyDoji = new DragonFlyDoji();
   let result = dragonFlyDoji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for DragonFlyDoji');
  });
  it('Check whether the supplied data has DragonFlyDoji pattern', function() {
   let dragonFlyDoji = new DragonFlyDoji();
   let result = dragonFlyDoji.hasPattern(inputDot);
   assert.deepEqual(result, false, 'Invalid result for a single point Doji');
  });
})
