let BullishSpinningTop from '../../src/candlestick/BullishSpinningTop').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [20.50],
  high: [20.87],
  close: [20.62],
  low: [20.23],
  
}

Deno.test('BullishSpinningTop : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishSpinningTop.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BullishSpinningTop pattern', function() {
   let bullishSpinningTop = new BullishSpinningTop ();
   let result = bullishSpinningTop.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BullishSpinningTop')
   
  });
})

