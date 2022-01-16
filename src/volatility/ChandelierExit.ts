// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { ATR } from '../directionalmovement/ATR.ts';
import LinkedList from '../Utils/FixedSizeLinkedList.ts';
export class ChandelierExitInput extends IndicatorInput {
  period : number = 22;
  multiplier : number = 3;
  high : number[];
  low : number[];
  close : number[];
}

export class ChandelierExitOutput extends IndicatorInput {
  exitLong : number;
  exitShort : number;
};

export class ChandelierExit extends Indicator {
  generator:IterableIterator<ChandelierExitOutput | undefined>;
    constructor (input:ChandelierExitInput) {
      super(input);
      let highs       = input.high;
      let lows        = input.low;
      let closes      = input.close;

      this.result = [];
      let atrProducer = new ATR({period : input.period, high : [], low : [], close : [], format : (v) => {return v}});
      let dataCollector = new LinkedList(input.period * 2, true, true, false);
      this.generator = (function* (){
        let result;
        let tick = yield;
        let atr;
        while (true)
        {
          let { high, low } = tick;
          dataCollector.push(high);
          dataCollector.push(low);
          atr = atrProducer.nextValue(tick)
          if((dataCollector.totalPushed >= (2 * input.period)) &&  atr!= undefined) {
            result = {
              exitLong : dataCollector.periodHigh - atr * input.multiplier,
              exitShort : dataCollector.periodLow + atr * input.multiplier
            } 
          }
          tick = yield result
        }
      })();

      this.generator.next();

      highs.forEach((tickHigh, index) => {
        let tickInput = {
          high    : tickHigh,
          low     : lows[index],
          close   : closes[index],
        }
        let result = this.generator.next(tickInput);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
  };

  static calculate = chandelierexit;

  nextValue(price:ChandelierExitInput):ChandelierExitOutput | undefined {
     let result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function chandelierexit(input:ChandelierExitInput):number[] {
      Indicator.reverseInputs(input);
      let result = new ChandelierExit(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
