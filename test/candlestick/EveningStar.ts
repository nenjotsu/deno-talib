let EveningStar from '../../src/candlestick/EveningStar').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.70,22.05],
  close: [21.30,22.52,19.45],
  low: [18.13,21.87,19.30]
}

Deno.test('EveningStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/EveningStar.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has EveningStar pattern', function() {
   let eveningStar = new EveningStar ();
   let result        = eveningStar.hasPattern(input);
   assertEquals(result, true, 'Invalid result for EveningStar');
  });
})



