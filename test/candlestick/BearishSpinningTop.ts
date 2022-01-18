let BearishSpinningTop from '../../src/candlestick/BearishSpinningTop').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [20.62],
  high: [20.75],
  close: [20.50],
  low: [20.34],
  
}

Deno.test('BearishSpinningTop : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishSpinningTop.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BearishSpinningTop pattern', function() {
   let bearishSpinningTop = new BearishSpinningTop ();
   let result = bearishSpinningTop.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BearishSpinningTop')
   
  });
})

