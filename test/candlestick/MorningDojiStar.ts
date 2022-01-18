let MorningDojiStar from '../../src/candlestick/MorningDojiStar').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,20.30,21.58],
  low: [20.65,20.10,20.40]
}

Deno.test('MorningDojiStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/MorningDojiStar.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has MorningDojiStar pattern', function() {
   let morningDojiStar = new MorningDojiStar ();
   let result      = morningDojiStar.hasPattern(input);
   assertEquals(result, true, 'Invalid result for MorningDojiStar');
  });
})



