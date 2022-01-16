// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { SMA } from '../moving_averages/SMA.ts';
import { EMA } from '../moving_averages/EMA.ts';
import { ATR } from '../directionalmovement/ATR.ts';

export class KeltnerChannelsInput extends IndicatorInput {
  maPeriod : number = 20;
  atrPeriod: number = 10;
  useSMA : boolean = false;
  multiplier : number = 1;
  high : number[];
  low : number[];
  close : number[];
}


export class KeltnerChannelsOutput extends IndicatorInput {
  middle : number;
  upper : number;
  lower :number;
};

export class KeltnerChannels extends Indicator {
  result : KeltnerChannelsOutput[]
  generator:IterableIterator<KeltnerChannelsOutput | undefined>;
    constructor (input:KeltnerChannelsInput) {
      super(input);
      let maType = input.useSMA ? SMA : EMA;
      let maProducer = new maType({period : input.maPeriod, values : [], format : (v) => {return v}});
      let atrProducer = new ATR({period : input.atrPeriod, high : [], low : [], close : [], format : (v) => {return v}});
      let tick;
      this.result = [];
      this.generator = (function* (){
        let KeltnerChannelsOutput
        let result;
        tick = yield;
        while (true)
        {
          let { close } = tick;
          let ma = maProducer.nextValue(close);
          let atr = atrProducer.nextValue(tick)
          if(ma!=undefined && atr!=undefined) {
            result = {
              middle : ma,
              upper : ma + (input.multiplier * (atr)),
              lower : ma - (input.multiplier * (atr))
            }
          }
          tick = yield result;
        }
      })();

      this.generator.next();

      let highs = input.high;

      highs.forEach((tickHigh, index) => {
        let tickInput = {
          high    : tickHigh,
          low     : input.low[index],
          close   : input.close[index],
        }
        let result = this.generator.next(tickInput);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
  };

  static calculate = keltnerchannels;

  nextValue(price:KeltnerChannelsInput):KeltnerChannelsOutput | undefined {
     let result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function keltnerchannels(input:KeltnerChannelsInput):KeltnerChannelsOutput[] {
      Indicator.reverseInputs(input);
      let result = new KeltnerChannels(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
