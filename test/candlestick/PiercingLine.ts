let PiercingLine from '../../src/candlestick/PiercingLine').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [42.70, 41.33],
  high: [42.82,42.50],
  close: [41.60,42.34],
  low: [41.45,41.15],
  
}

Deno.test('PiercingLine : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/PiercingLine.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has PiercingLine pattern', function() {
   let piercingLine = new PiercingLine ();
   let result = piercingLine.hasPattern(input);
   assertEquals(result, true, 'Invalid result for PiercingLine')
   
  });
})

