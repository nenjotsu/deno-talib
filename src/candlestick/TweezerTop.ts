import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';
import { averageloss } from '../Utils/AverageLoss.ts';
import { averagegain } from '../Utils/AverageGain.ts';

export default class TweezerTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'TweezerTop';
        this.requiredCount = 5;
    }

    logic (data:StockData) {
        return this.upwardTrend(data) && data.high[3] == data.high[4];
    }

    upwardTrend (data:StockData) {
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, 3), period: 2 });
        let losses = averageloss({ values: data.close.slice(0, 3), period: 2 });
        // Upward trend, so more gains than losses
        return gains > losses;
    }
}

export function tweezertop(data:StockData) {
  return new TweezerTop().hasPattern(data);
}
