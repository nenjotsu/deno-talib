let BearishHammer   from '../../src/candlestick/BearishHammerStick').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let basicHammer = {
  open: [30.10],
  high: [30.10],
  close: [26.13],
  low: [10.06],
}

Deno.test('Bearish Hammer (Single Stick) : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BearishHammerStick.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has Bearish Hammer (Single Stick) pattern', function() {
   let bearishHammer = new BearishHammer();
   let result = bearishHammer.hasPattern(basicHammer);
   assertEquals(result, true, 'Invalid result for Bearish Hammer (Single Stick)');
  });
})
