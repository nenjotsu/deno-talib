import FixedSizeLinkedList from "./Utils/FixedSizeLinkedList.ts";

export { CandleData, CandleList } from "./StockData.ts";
export { SMA, sma } from "./moving_averages/SMA.ts";
export { EMA, ema } from "./moving_averages/EMA.ts";
export { WMA, wma } from "./moving_averages/WMA.ts";
export { WEMA, wema } from "./moving_averages/WEMA.ts";
export { MACD, macd } from "./moving_averages/MACD.ts";
export { RSI, rsi } from "./oscillators/RSI.ts";
export { BollingerBands, bollingerbands } from "./volatility/BollingerBands.ts";
export { ADX, adx } from "./directionalmovement/ADX.ts";
export { ATR, atr } from "./directionalmovement/ATR.ts";
export { TrueRange, truerange } from "./directionalmovement/TrueRange.ts";
export { ROC, roc } from "./momentum/ROC.ts";
export { KST, kst } from "./momentum/KST.ts";
export { PSAR, psar } from "./momentum/PSAR.ts";
export { Stochastic, stochastic } from "./momentum/Stochastic.ts";
export { WilliamsR, williamsr } from "./momentum/WilliamsR.ts";
export { ADL, adl } from "./volume/ADL.ts";
export { OBV, obv } from "./volume/OBV.ts";
export { TRIX, trix } from "./momentum/TRIX.ts";
export { ForceIndex, forceindex } from "./volume/ForceIndex.ts";
export { CCI, cci } from "./oscillators/CCI.ts";
export {
  AwesomeOscillator,
  awesomeoscillator
} from "./oscillators/AwesomeOscillator.ts";
export { VWAP, vwap } from "./volume/VWAP.ts";
export { VolumeProfile, volumeprofile } from "./volume/VolumeProfile.ts";
export { MFI, mfi } from "./volume/MFI.ts";
export { StochasticRSI, stochasticrsi } from "./momentum/StochasticRSI.ts";

export { AverageGain, averagegain } from "./Utils/AverageGain.ts";
export { AverageLoss, averageloss } from "./Utils/AverageLoss.ts";
export { SD, sd } from "./Utils/SD.ts";
export { Highest, highest } from "./Utils/Highest.ts";
export { Lowest, lowest } from "./Utils/Lowest.ts";
export { Sum, sum } from "./Utils/Sum.ts";
export { FixedSizeLinkedList };

export { renko } from "./chart_types/Renko.ts";
export { HeikinAshi, heikinashi } from "./chart_types/HeikinAshi.ts";

export { bullish } from "./candlestick/Bullish.ts";
export { bearish } from "./candlestick/Bearish.ts";
export { abandonedbaby } from "./candlestick/AbandonedBaby.ts";
export { doji } from "./candlestick/Doji.ts";
export { bearishengulfingpattern } from "./candlestick/BearishEngulfingPattern.ts";
export { bullishengulfingpattern } from "./candlestick/BullishEngulfingPattern.ts";
export { darkcloudcover } from "./candlestick/DarkCloudCover.ts";
export { downsidetasukigap } from "./candlestick/DownsideTasukiGap.ts";
export { dragonflydoji } from "./candlestick/DragonFlyDoji.ts";
export { gravestonedoji } from "./candlestick/GraveStoneDoji.ts";
export { bullishharami } from "./candlestick/BullishHarami.ts";
export { bearishharami } from "./candlestick/BearishHarami.ts";
export { bullishharamicross } from "./candlestick/BullishHaramiCross.ts";
export { bearishharamicross } from "./candlestick/BearishHaramiCross.ts";
export { eveningdojistar } from "./candlestick/EveningDojiStar.ts";
export { eveningstar } from "./candlestick/EveningStar.ts";
export { morningdojistar } from "./candlestick/MorningDojiStar.ts";
export { morningstar } from "./candlestick/MorningStar.ts";
export { bullishmarubozu } from "./candlestick/BullishMarubozu.ts";
export { bearishmarubozu } from "./candlestick/BearishMarubozu.ts";
export { piercingline } from "./candlestick/PiercingLine.ts";
export { bullishspinningtop } from "./candlestick/BullishSpinningTop.ts";
export { bearishspinningtop } from "./candlestick/BearishSpinningTop.ts";
export { threeblackcrows } from "./candlestick/ThreeBlackCrows.ts";
export { threewhitesoldiers } from "./candlestick/ThreeWhiteSoldiers.ts";

export { bullishhammerstick } from "./candlestick/BullishHammerStick.ts";
export { bearishhammerstick } from "./candlestick/BearishHammerStick.ts";
export { bullishinvertedhammerstick } from "./candlestick/BullishInvertedHammerStick.ts";
export { bearishinvertedhammerstick } from "./candlestick/BearishInvertedHammerStick.ts";
export { hammerpattern } from "./candlestick/HammerPattern.ts";
export { hammerpatternunconfirmed } from "./candlestick/HammerPatternUnconfirmed.ts";
export { hangingman } from "./candlestick/HangingMan.ts";
export { hangingmanunconfirmed } from "./candlestick/HangingManUnconfirmed.ts";
export { shootingstar } from "./candlestick/ShootingStar.ts";
export { shootingstarunconfirmed } from "./candlestick/ShootingStarUnconfirmed.ts";
export { tweezertop } from "./candlestick/TweezerTop.ts";
export { tweezerbottom } from "./candlestick/TweezerBottom.ts";

export { fibonacciretracement } from "./drawingtools/fibonacci.ts";

// export {
//   PatternDetector,
//   predictPattern,
// } from "./patterndetection/patterndetection";
// export { AvailablePatterns } from "./patterndetection/patterndetection";
// export { hasDoubleBottom } from "./patterndetection/patterndetection";
// export { hasDoubleTop } from "./patterndetection/patterndetection";
// export { hasHeadAndShoulder } from "./patterndetection/patterndetection";
// export { hasInverseHeadAndShoulder } from "./patterndetection/patterndetection";
export { isTrendingUp } from "./patterndetection/patterndetection.ts";
export { isTrendingDown } from "./patterndetection/patterndetection.ts";

export { IchimokuCloud, ichimokucloud } from "./ichimoku/IchimokuCloud.ts";

export {
  KeltnerChannels,
  keltnerchannels,
  KeltnerChannelsInput,
  KeltnerChannelsOutput
} from "./volatility/KeltnerChannels.ts";
export {
  ChandelierExit,
  chandelierexit,
  ChandelierExitInput,
  ChandelierExitOutput
} from "./volatility/ChandelierExit.ts";
export { CrossUp, crossUp } from "./Utils/CrossUp.ts";
export { CrossDown, crossDown } from "./Utils/CrossDown.ts";

export { getConfig, setConfig } from "./config.ts";
