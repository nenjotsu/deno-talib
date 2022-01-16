import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class EveningStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'EveningStar';
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
         
        let firstdaysMidpoint = ((firstdaysOpen+firstdaysClose)/2);
        let isFirstBullish    = firstdaysClose > firstdaysOpen;
        let isSmallBodyExists = ((firstdaysHigh < seconddaysLow)&&
                                (firstdaysHigh < seconddaysHigh));
        let isThirdBearish    = thirddaysOpen > thirddaysClose; 

        let gapExists         = ((seconddaysHigh > firstdaysHigh) && 
                                (seconddaysLow > firstdaysHigh) && 
                                (thirddaysOpen < seconddaysLow) && 
                                (seconddaysClose > thirddaysOpen));
      let doesCloseBelowFirstMidpoint = thirddaysClose < firstdaysMidpoint;
      return (isFirstBullish && isSmallBodyExists && gapExists && isThirdBearish && doesCloseBelowFirstMidpoint );
     }
}

export function eveningstar(data:StockData) {
  return new EveningStar().hasPattern(data);
}