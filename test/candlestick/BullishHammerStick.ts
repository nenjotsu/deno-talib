let BullishHammer   from '../../src/candlestick/BullishHammerStick').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let basicHammer = {
  open: [26.13],
  high: [30.10],
  close: [30.10],
  low: [10.06],
}

Deno.test('Bullish Hammer (Single Stick): ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishHammerStick.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has Bullish Hammer (Single Stick) pattern', function() {
   let bullishHammer = new BullishHammer();
   let result = bullishHammer.hasPattern(basicHammer);
   assertEquals(result, true, 'Invalid result for Bullish Hammer (Single Stick)');
  });
})
