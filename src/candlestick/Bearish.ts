import BearishEngulfingPattern from './BearishEngulfingPattern.ts';
import BearishHarami from './BearishHarami.ts';
import BearishHaramiCross from './BearishHaramiCross.ts';
import EveningDojiStar from './EveningDojiStar.ts';
import EveningStar from './EveningStar.ts';
import BearishMarubozu from './BearishMarubozu.ts';
import ThreeBlackCrows from './ThreeBlackCrows.ts';
import BearishHammerStick from './BearishHammerStick.ts';
import BearishInvertedHammerStick from './BearishInvertedHammerStick.ts';
import HangingMan from './HangingMan.ts';
import HangingManUnconfirmed from './HangingManUnconfirmed.ts';
import ShootingStar from './ShootingStar.ts';
import ShootingStarUnconfirmed from './ShootingStarUnconfirmed.ts';
import TweezerTop from './TweezerTop.ts';
import StockData from '../StockData.ts';
import CandlestickFinder from './CandlestickFinder.ts';

let bearishPatterns = [
    new BearishEngulfingPattern(),
    new BearishHarami(),
    new BearishHaramiCross(),
    new EveningDojiStar(),
    new EveningStar(),
    new BearishMarubozu(),
    new ThreeBlackCrows(),
    new BearishHammerStick(),
    new BearishInvertedHammerStick(),
    new HangingMan(),
    new HangingManUnconfirmed(),
    new ShootingStar(),
    new ShootingStarUnconfirmed(),
    new TweezerTop()
];

export default class BearishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }

    hasPattern (data:StockData) {
        return bearishPatterns.reduce(function(state, pattern) {
            return state || pattern.hasPattern(data);
        }, false)
    }
}

export function bearish(data:StockData){
    return new BearishPatterns().hasPattern(data);
}