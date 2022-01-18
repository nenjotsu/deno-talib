let AbandonedBaby from '../../src/candlestick/AbandonedBaby').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [31.10,26.18,27.47],
  high: [31.80,26.91,30.94],
  close: [28.10,26.18,30.62],
  low: [27.50,25.40,27.03]
}

Deno.test('AbandonedBaby : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/abandonedbaby.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has AbandonedBaby pattern', function() {
   let abandonedBaby = new AbandonedBaby ();
   let result        = abandonedBaby.hasPattern(input);
   assertEquals(result, true, 'Invalid result for AbandonedBaby');
  });
})



