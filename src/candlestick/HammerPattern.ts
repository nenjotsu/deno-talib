import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';
import { averageloss } from '../Utils/AverageLoss.ts';
import { averagegain } from '../Utils/AverageGain.ts';
import { bearishhammerstick } from './BearishHammerStick.ts';
import { bearishinvertedhammerstick } from './BearishInvertedHammerStick.ts';
import { bullishhammerstick } from './BullishHammerStick.ts';
import { bullishinvertedhammerstick } from './BullishInvertedHammerStick.ts';

export default class HammerPattern extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'HammerPattern';
        this.requiredCount = 5;
    }

    logic (data:StockData) {
        let isPattern = this.downwardTrend(data);
        isPattern = isPattern && this.includesHammer(data);
        isPattern = isPattern && this.hasConfirmation(data);
        return isPattern;
    }

    downwardTrend (data:StockData, confirm = true) {
        let end = confirm ? 3 : 4;
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, end), period: end - 1 });
        let losses = averageloss({ values: data.close.slice(0, end), period: end - 1 });
        // Downward trend, so more losses than gains
        return losses > gains;
    }

    includesHammer (data:StockData, confirm = true) {
        let start = confirm ? 3 : 4;
        let end = confirm ? 4 : undefined;
        let possibleHammerData = {
            open: data.open.slice(start, end),
            close: data.close.slice(start, end),
            low: data.low.slice(start, end),
            high: data.high.slice(start, end),
        };

        let isPattern = bearishhammerstick(possibleHammerData);
        isPattern = isPattern || bearishinvertedhammerstick(possibleHammerData);
        isPattern = isPattern || bullishhammerstick(possibleHammerData);
        isPattern = isPattern || bullishinvertedhammerstick(possibleHammerData);

        return isPattern;
    }

    hasConfirmation (data:StockData) {
        let possibleHammer = {
            open: data.open[3],
            close: data.close[3],
            low: data.low[3],
            high: data.high[3],
        }
        let possibleConfirmation = {
            open: data.open[4],
            close: data.close[4],
            low: data.low[4],
            high: data.high[4],
        }
        // Confirmation candlestick is bullish
        let isPattern = possibleConfirmation.open < possibleConfirmation.close;
        return isPattern && possibleHammer.close < possibleConfirmation.close;
    }
}

export function hammerpattern(data:StockData) {
  return new HammerPattern().hasPattern(data);
}
