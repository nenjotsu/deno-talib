let ThreeWhiteSoldiers from '../../src/candlestick/ThreeWhiteSoldiers').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [21.12,21.48,21.80],
  close: [21.65,22.20,22.65],
  high: [21.83,22.40,22.80],
  low: [20.85,21.36,21.66]
}

Deno.test('ThreeWhiteSoldiers : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeWhiteSoldiers.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has ThreeWhiteSoldiers pattern', function() {
   let threeWhiteSoldiers = new ThreeWhiteSoldiers ();
   let result      = threeWhiteSoldiers.hasPattern(input);
   assertEquals(result, true, 'Invalid result for ThreeWhiteSoldiers');
  });
})



