let BearishInvertedHammer from '../../src/candlestick/BearishInvertedHammerStick').default;
let assert                from 'assert');
let drawCandleStick       from 'draw-candlestick');
let fs                    from 'fs');

let basicHammer = {
  open: [30.10],
  high: [52.06],
  close: [26.13],
  low: [26.13],
}

Deno.test('Bearish Inverted Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BearishInvertedHammerStick.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has Bearish Inverted Hammer (Single Stick) pattern', function() {
   let bearishInvertedHammer = new BearishInvertedHammer();
   let result = bearishInvertedHammer.hasPattern(basicHammer);
   assertEquals(result, true, 'Invalid result for Bearish Inverted (Single Stick) Hammer');
  });
})
