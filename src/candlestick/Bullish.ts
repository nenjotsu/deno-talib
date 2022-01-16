import MorningStar from './MorningStar.ts';
import BullishEngulfingPattern from './BullishEngulfingPattern.ts';
import BullishHarami from './BullishHarami.ts';
import BullishHaramiCross from './BullishHaramiCross.ts';
import MorningDojiStar from './MorningDojiStar.ts';
import DownsideTasukiGap from './DownsideTasukiGap.ts';
import BullishMarubozu from './BullishMarubozu.ts';
import PiercingLine from './PiercingLine.ts';
import ThreeWhiteSoldiers from './ThreeWhiteSoldiers.ts';
import BullishHammerStick from './BullishHammerStick.ts';
import BullishInvertedHammerStick from './BullishInvertedHammerStick.ts';
import HammerPattern from './HammerPattern.ts';
import HammerPatternUnconfirmed from './HammerPatternUnconfirmed.ts';
import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';
import TweezerBottom from './TweezerBottom.ts';

let bullishPatterns = [
    new BullishEngulfingPattern(),
    new DownsideTasukiGap(),
    new BullishHarami(),
    new BullishHaramiCross(),
    new MorningDojiStar(),
    new MorningStar(),
    new BullishMarubozu(),
    new PiercingLine(),
    new ThreeWhiteSoldiers(),
    new BullishHammerStick(),
    new BullishInvertedHammerStick(),
    new HammerPattern(),
    new HammerPatternUnconfirmed(),
    new TweezerBottom()
];

export default class BullishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }

    hasPattern (data:StockData) {
        return bullishPatterns.reduce(function(state, pattern) {
            let result = pattern.hasPattern(data);
            return state || result;
        }, false)
    }
}

export function bullish(data:StockData) {
  return new BullishPatterns().hasPattern(data);
}