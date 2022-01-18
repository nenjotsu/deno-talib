let EveningDojiStar from '../../src/candlestick/EveningDojiStar').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.40,22.05],
  close: [21.30,22.22,19.45],
  low: [18.13,21.87,19.30]
}

Deno.test('EveningDojiStar : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/EveningDojiStar.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has EveningDojiStar pattern', function() {
   let eveningDojiStar = new EveningDojiStar ();
   let result        = eveningDojiStar.hasPattern(input);
   assertEquals(result, true, 'Invalid result for EveningDojiStar');
  });
})



