import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

export default class BearishHammerStick extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishHammerStick';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBearishHammer = daysOpen > daysClose;
        isBearishHammer = isBearishHammer && this.approximateEqual(daysOpen, daysHigh);
        isBearishHammer = isBearishHammer && (daysOpen - daysClose) <= 2 * (daysClose - daysLow);

        return isBearishHammer;
    }
}

export function bearishhammerstick(data:StockData) {
  return new BearishHammerStick().hasPattern(data);
}