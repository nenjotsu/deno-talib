"use strict"
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { SMA }  from '../moving_averages/SMA.ts';
import { SD } from '../Utils/SD.ts';
export class BollingerBandsInput extends IndicatorInput {
  // @ts-ignore
    period : number;
    // @ts-ignore
    stdDev : number;
    // @ts-ignore
    values : number[];
};

export class BollingerBandsOutput extends IndicatorInput {
  // @ts-ignore
    middle : number;
    // @ts-ignore
    upper : number;
    // @ts-ignore
    lower :number;
    // @ts-ignore
    pb:number;
};

export class BollingerBands extends Indicator {
    generator:IterableIterator<BollingerBandsOutput | undefined>;
    constructor(input:BollingerBandsInput) {
        super(input);
        let period = input.period
        let priceArray = input.values;
        let stdDev     = input.stdDev;
        let format     = this.format;

        let sma,sd;

        this.result = [];

        sma = new SMA({period : period, values :[], format : (v) => {return v}});
        sd  = new SD({period : period, values : [], format : (v) => {return v}});

        this.generator = (function* (){
            let result;
            let tick;
            let calcSMA;
            let calcsd;
            // @ts-ignore
            tick = yield;
            while (true) {
                calcSMA = sma.nextValue(tick);
                calcsd  = sd.nextValue(tick);
                if(calcSMA){
                    let middle = format(calcSMA);
                    // @ts-ignore
                    let upper = format(calcSMA + (calcsd * stdDev));
                    // @ts-ignore
                    let lower = format(calcSMA - (calcsd * stdDev));
                    // @ts-ignore
                    let pb:number = format((tick - lower) / (upper - lower));
                    result = {
                        middle : middle,
                        upper  : upper,
                        lower  : lower,
                        pb     : pb
                    }
                }
                // @ts-ignore
                tick = yield result;
            }
        })();

        this.generator.next();

        priceArray.forEach((tick) => {
          // @ts-ignore
            let result = this.generator.next(tick);
            if(result.value != undefined){
                this.result.push(result.value);
            }
        });
    }

    static calculate = bollingerbands;

    nextValue(price:number):BollingerBandsOutput | undefined {
      // @ts-ignore
        return this.generator.next(price).value;
    };
}

export function bollingerbands(input:BollingerBandsInput):BollingerBandsOutput[] {
       Indicator.reverseInputs(input);
        let result = new BollingerBands(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };
