let BullishInvertedHammer from '../../src/candlestick/BullishInvertedHammerStick').default;
let assert                from 'assert');
let drawCandleStick       from 'draw-candlestick');
let fs                    from 'fs');

let basicHammer = {
  open: [26.13],
  high: [52.06],
  close: [30.10],
  low: [26.13],
}

Deno.test('Bullish Inverted Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishInvertedHammerStick.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has Bullish Inverted Hammer (Single Stick) pattern', function() {
   let bullishInvertedHammer = new BullishInvertedHammer();
   let result = bullishInvertedHammer.hasPattern(basicHammer);
   assertEquals(result, true, 'Invalid result for Bullish Inverted Hammer (Single Stick)');
  });
})
