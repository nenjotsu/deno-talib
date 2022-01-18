import { CandleData } from "../StockData.ts";
import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import { SMA } from "../moving_averages/SMA.ts";
import LinkedList from "../Utils/FixedSizeLinkedList.ts";

export class CCIInput extends IndicatorInput {
  open: number[] = [];
  high: number[] = [];
  low: number[] = [];
  close: number[] = [];
  period?: number;
}

export class CCI extends Indicator {
  result: number[];
  generator: IterableIterator<number | undefined>;
  constructor(input: CCIInput) {
    super(input);
    const open = input.open;
    const lows = input.low;
    const highs = input.high;
    const closes = input.close;
    const period = input.period || 14;
    let format = this.format;
    const constant = 0.015;
    const currentTpSet = new LinkedList(period);

    const tpSMACalculator = new SMA({
      period: period,
      values: [],
      format: (v: any) => v
    });

    if (!(lows.length === highs.length && highs.length === closes.length)) {
      throw "Inputs(low,high, close) not of equal size";
    }

    this.result = [];

    interface _tick {
      high: number;
      low: number;
      close: number;
    }
    // @ts-ignore
    this.generator = (function* () {
      // @ts-ignore
      let tick:_tick = yield;
      while (true) {
        const tp = (tick.high + tick.low + tick.close) / 3;
        currentTpSet.push(tp);
        const smaTp = tpSMACalculator.nextValue(tp);
        let meanDeviation = null;
        let cci: number;
        let sum = 0;
        if (smaTp != undefined) {
          //First, subtract the most recent 20-period average of the typical price from each period's typical price.
          //Second, take the absolute values of these numbers.
          //Third,sum the absolute values.
          for (const x of currentTpSet.iterator()) {
            sum = sum + Math.abs(x - smaTp);
          }
          //Fourth, divide by the total number of periods (20).
          meanDeviation = sum / period;
          cci = (tp - smaTp) / (constant * meanDeviation);
        }
        // @ts-ignore
        tick = yield cci;
      }
    })();

    this.generator.next();

    lows.forEach((_tick, index) => {
      const result = this.generator.next({
        high: highs[index],
        low: lows[index],
        close: closes[index]
      } as any);
      if (result.value != undefined) {
        this.result.push(result.value);
      }
    });
  }

  static calculate = cci;

  nextValue(price: CandleData): number | undefined {
    // @ts-ignore
    const result = this.generator.next(price).value;
    if (result != undefined) {
      return result;
    }
  }
}

export function cci(input: CCIInput): number[] {
  Indicator.reverseInputs(input);
  let result = new CCI(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
