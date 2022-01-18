let MorningStar from '../../src/candlestick/MorningStar').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

// let input = {
//   open: [22.20,19.80,20.70],
//   high: [22.50,20.45,21.82],
//   close: [20.80,20.30,21.58],
//   low: [20.65,19.60,20.40]
// }

let input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,19.80,21.58],
  low: [20.65,19.60,20.40]
}

Deno.test('MorningStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/MorningStar.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has MorningStar pattern', function() {
   let morningStar = new MorningStar ();
   let result      = morningStar.hasPattern(input);
   assertEquals(result, true, 'Invalid result for MorningStar');
  });
})



