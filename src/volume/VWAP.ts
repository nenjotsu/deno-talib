// @ts-nocheck
import { CandleData } from "../StockData.ts";
import { Indicator, IndicatorInput } from "../indicator/indicator.ts";

export class VWAPInput extends IndicatorInput {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

export class VWAP extends Indicator {
  result: number[];
  generator: IterableIterator<number | undefined>;
  constructor(input: VWAPInput) {
    super(input);
    let open = input.open;
    let lows = input.low;
    let highs = input.high;
    let closes = input.close;
    let volumes = input.volume;
    let format = this.format;

    if (!(lows.length === highs.length && highs.length === closes.length)) {
      throw "Inputs(low,high, close) not of equal size";
    }

    this.result = [];

    this.generator = (function* () {
      let tick = yield;
      let cumulativeTotal = 0;
      let cumulativeVolume = 0;
      while (true) {
        let typicalPrice = (tick.high + tick.low + tick.close) / 3;
        let total = tick.volume * typicalPrice;
        cumulativeTotal = cumulativeTotal + total;
        cumulativeVolume = cumulativeVolume + tick.volume;
        tick = yield cumulativeTotal / cumulativeVolume;
      }
    })();

    this.generator.next();

    lows.forEach((tick, index) => {
      let result = this.generator.next({
        high: highs[index],
        low: lows[index],
        close: closes[index],
        volume: volumes[index]
      });
      if (result.value != undefined) {
        this.result.push(result.value);
      }
    });
  }

  static calculate = vwap;

  nextValue(price: CandleData): number | undefined {
    let result = this.generator.next(price).value;
    if (result != undefined) {
      return result;
    }
  }
}

export function vwap(input: VWAPInput): number[] {
  Indicator.reverseInputs(input);
  let result = new VWAP(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
