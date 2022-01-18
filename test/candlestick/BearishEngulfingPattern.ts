let BearishEngulfingPattern from '../../src/candlestick/BearishEngulfingPattern').default;
let assert                  from 'assert');
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');
let twoDayBearishInput = {
  open: [21.44,27.89],
  high: [25.10,30.87],
  close: [23.25,15.36],
  low: [20.82,14.93],
}

let oneDayBearishInput = {
  open: [21.44],
  high: [25.10],
  close: [23.25],
  low: [20.82],
}

Deno.test('BearishEngulfingPattern : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(twoDayBearishInput);
    fs.writeFileSync(__dirname+'/images/bearishEngulfing.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BearishEngulfingPattern pattern', function() {
   let bearishEngulfingPattern = new BearishEngulfingPattern ();
   let result        = bearishEngulfingPattern.hasPattern(twoDayBearishInput);
   assertEquals(result, true, 'Invalid result for BearishEngulfingPattern');
  });
  
  Deno.test('Should return false if less data is provided', function() {
   let bearishEngulfingPattern = new BearishEngulfingPattern ();
   let result        = bearishEngulfingPattern.hasPattern(oneDayBearishInput);
   assertEquals(result, false, 'Invalid result for BearishEngulfingPattern');
  });
})

