import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class BullishMarubozu extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishMarubozu';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBullishMarbozu =  this.approximateEqual(daysClose, daysHigh) && 
                                this.approximateEqual(daysLow, daysOpen) &&
                                daysOpen < daysClose && 
                                daysOpen < daysHigh;
        

        return (isBullishMarbozu);
        
    }
}

export function bullishmarubozu(data:StockData) {
  return new BullishMarubozu().hasPattern(data);
}