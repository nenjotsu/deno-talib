import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class GraveStoneDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 1;
        this.name = 'GraveStoneDoji';
    }
    logic (data:StockData) {
        let daysOpen   = data.open[0];
        let daysClose  = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen = isOpenEqualsClose && this.approximateEqual(daysOpen, daysHigh);
        let isLowEqualsClose = isOpenEqualsClose && this.approximateEqual(daysClose, daysLow);
        return (isOpenEqualsClose && isLowEqualsClose && !isHighEqualsOpen);
    }
}

export function gravestonedoji(data:StockData) {
  return new GraveStoneDoji().hasPattern(data);
}