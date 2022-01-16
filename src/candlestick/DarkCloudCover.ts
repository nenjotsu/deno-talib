import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class DarkCloudCover extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'DarkCloudCover';
        this.requiredCount  = 2;
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
        
        let firstdayMidpoint    = ((firstdaysClose+firstdaysOpen)/2);
        let isFirstBullish      = firstdaysClose > firstdaysOpen;
        let isSecondBearish     = seconddaysClose < seconddaysOpen;
        let isDarkCloudPattern  = ((seconddaysOpen > firstdaysHigh) && 
                                  (seconddaysClose < firstdayMidpoint)&&
                                  (seconddaysClose > firstdaysOpen));              
   
        return (isFirstBullish && isSecondBearish && isDarkCloudPattern);
        
   }
}

export function darkcloudcover(data:StockData) {
  return new DarkCloudCover().hasPattern(data);
}