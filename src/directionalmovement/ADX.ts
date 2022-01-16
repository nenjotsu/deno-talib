// @ts-nocheck
import { WilderSmoothing } from '../moving_averages/WilderSmoothing.ts';
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { MDM } from   './MinusDM.ts';
import { PDM } from    './PlusDM.ts';
import { TrueRange } from './TrueRange.ts';
import { SMA } from       '../moving_averages/SMA.ts';
import { WEMA } from       '../moving_averages/WEMA.ts';

export class ADXInput extends IndicatorInput {
  high : number[];
  low :number[];
  close : number[];
  period : number;
};

export class ADXOutput extends IndicatorInput {
 adx : number;
 pdi : number;
 mdi : number;
};



export class ADX extends Indicator {
  result : ADXOutput[]
  generator:IterableIterator<ADXOutput | undefined>;;
  constructor(input:ADXInput) {
    super(input);
    let lows = input.low;
    let highs = input.high;
    let closes = input.close;
    let period = input.period;
    let format = this.format;

    let plusDM = new PDM({
      high: [],
      low : []
    });

    let minusDM = new MDM({
      high: [],
      low : []
    });

    let emaPDM = new WilderSmoothing({period: period, values:[], format : (v) => {return v}});
    let emaMDM = new WilderSmoothing({period: period, values:[], format : (v) => {return v}});
    let emaTR  = new WilderSmoothing({period: period, values:[], format : (v) => {return v}});
    let emaDX  = new WEMA({period: period, values:[], format : (v) => {return v}});

    let tr    = new TrueRange({
      low : [],
      high: [],
      close: [],
    });

    if(!((lows.length === highs.length) && (highs.length === closes.length) )){
      throw ('Inputs(low,high, close) not of equal size');
    }

    this.result = [];
ADXOutput
    this.generator = (function* (){
      let tick = yield;
      let index = 0;
      let lastATR,lastAPDM,lastAMDM,lastPDI,lastMDI,lastDX,smoothedDX;
      lastATR = 0;
      lastAPDM = 0;
      lastAMDM = 0;
      while (true) {
        let calcTr = tr.nextValue(tick);
        let calcPDM = plusDM.nextValue(tick);
        let calcMDM = minusDM.nextValue(tick);
        if(calcTr === undefined){
          tick = yield;
          continue;
        }
        let lastATR = emaTR.nextValue(calcTr)
        let lastAPDM  = emaPDM.nextValue(calcPDM);
        let lastAMDM  = emaMDM.nextValue(calcMDM);
        if((lastATR != undefined) && (lastAPDM != undefined) && (lastAMDM != undefined)) {
          lastPDI = (lastAPDM) * 100 / lastATR;
          lastMDI = (lastAMDM) * 100 / lastATR;
          let diDiff = Math.abs(lastPDI - lastMDI);
          let diSum = (lastPDI + lastMDI);
          lastDX = (diDiff / diSum) * 100;
          smoothedDX = emaDX.nextValue(lastDX)
          // console.log(tick.high.toFixed(2), tick.low.toFixed(2), tick.close.toFixed(2) , calcTr.toFixed(2), calcPDM.toFixed(2), calcMDM.toFixed(2), lastATR.toFixed(2), lastAPDM.toFixed(2), lastAMDM.toFixed(2), lastPDI.toFixed(2), lastMDI.toFixed(2), diDiff.toFixed(2), diSum.toFixed(2), lastDX.toFixed(2));
        } 
        tick = yield { adx : smoothedDX, pdi : lastPDI, mdi : lastMDI };
      }
    })();

    this.generator.next();

    lows.forEach((tick,index) => {
      let result = this.generator.next({
        high : highs[index],
        low  : lows[index],
        close : closes[index]
      });
      if(result.value != undefined && result.value.adx != undefined){
        this.result.push({ adx : format(result.value.adx), pdi : format(result.value.pdi), mdi : format(result.value.mdi) });
      }
    });
  };

  static calculate = adx;

  nextValue(price:number):ADXOutput | undefined {
      let result = this.generator.next(price).value;
      if(result != undefined && result.adx != undefined) {
        return { adx : this.format(result.adx), pdi : this.format(result.pdi), mdi : this.format(result.mdi) };
      }
  };
}

export function adx(input:ADXInput):ADXOutput[] {
    Indicator.reverseInputs(input);
    let result = new ADX(input).result;
    if(input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
  };