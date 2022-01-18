let ThreeBlackCrows from '../../src/candlestick/ThreeBlackCrows').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [21.65,21.48,21.25],
  high: [21.82,21.57,21.35],
  close: [21.32,21.10,20.70],
  low: [21.25,20.97,20.60]
}

Deno.test('ThreeBlackCrows : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeBlackCrows.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has ThreeBlackCrows pattern', function() {
   let threeBlackCrows = new ThreeBlackCrows ();
   let result      = threeBlackCrows.hasPattern(input);
   assertEquals(result, true, 'Invalid result for ThreeBlackCrows');
  });
})



