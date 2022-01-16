import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class ThreeWhiteSoldiers extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'ThreeWhiteSoldiers';
        this.requiredCount  = 3;
    }
    logic (data:StockData) {
        let firstdaysOpen   = data.open[0];
        let firstdaysClose  = data.close[0];
        let firstdaysHigh   = data.high[0];
        let firstdaysLow    = data.low[0]
        let seconddaysOpen  = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh  = data.high[1];
        let seconddaysLow   = data.low[1]
        let thirddaysOpen   = data.open[2];
        let thirddaysClose  = data.close[2];
        let thirddaysHigh   = data.high[2];
        let thirddaysLow    = data.low[2];
         
        let isUpTrend                = seconddaysHigh > firstdaysHigh &&
                                       thirddaysHigh > seconddaysHigh;
        let isAllBullish             = firstdaysOpen < firstdaysClose &&
                                       seconddaysOpen < seconddaysClose &&
                                       thirddaysOpen < thirddaysClose;
                                      
      let doesOpenWithinPreviousBody = firstdaysClose > seconddaysOpen &&
                                        seconddaysOpen <  firstdaysHigh &&
                                        seconddaysHigh > thirddaysOpen  &&
                                        thirddaysOpen < seconddaysClose;
      
      return (isUpTrend && isAllBullish && doesOpenWithinPreviousBody);
     }
}

export function threewhitesoldiers(data:StockData) {
  return new ThreeWhiteSoldiers().hasPattern(data);
}
