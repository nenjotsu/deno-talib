let BearishEngulfingPattern = require('../../lib/candlestick/BearishEngulfingPattern').default;
let assert                  = require('assert');
let drawCandleStick         = require('draw-candlestick');
let fs                      = require('fs');
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

describe('BearishEngulfingPattern : ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(twoDayBearishInput);
    fs.writeFileSync(__dirname+'/images/bearishEngulfing.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishEngulfingPattern pattern', function() {
   let bearishEngulfingPattern = new BearishEngulfingPattern ();
   let result        = bearishEngulfingPattern.hasPattern(twoDayBearishInput);
   assert.deepEqual(result, true, 'Invalid result for BearishEngulfingPattern');
  });
  
  it('Should return false if less data is provided', function() {
   let bearishEngulfingPattern = new BearishEngulfingPattern ();
   let result        = bearishEngulfingPattern.hasPattern(oneDayBearishInput);
   assert.deepEqual(result, false, 'Invalid result for BearishEngulfingPattern');
  });
})

