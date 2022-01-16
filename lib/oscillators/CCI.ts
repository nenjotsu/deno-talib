// deno-lint-ignore-file
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { SMA } from '../moving_averages/SMA.ts';
import LinkedList from '../Utils/FixedSizeLinkedList.ts';
export class CCIInput extends IndicatorInput {};
export class CCI extends Indicator {
generator: Generator<number|undefined,never,any>;
static calculate: (input: any) => any;
    constructor(input: { low?: any; high?: any; close?: any; period?: any; format?: (v: any) => any; } | any) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        let constant = .015;
        var currentTpSet = new LinkedList(period);
        ;
        var tpSMACalculator = new SMA({ period: period, values: [], format: (v: any) => { return v; } });
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            // @ts-ignore
            var tick = yield;
            while (true) {
                let tp = (tick.high + tick.low + tick.close) / 3;
                currentTpSet.push(tp);
                let smaTp = tpSMACalculator.nextValue(tp);
                let meanDeviation = null;
                let cci;
                let sum = 0;
                if (smaTp != undefined) {
                    //First, subtract the most recent 20-period average of the typical price from each period's typical price. 
                    //Second, take the absolute values of these numbers.
                    //Third,sum the absolute values. 
                    for (let x of currentTpSet.iterator()) {
                        sum = sum + (Math.abs(x - smaTp));
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
        lows.forEach((_: any, index: string|number) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price: any) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
}
CCI.calculate = cci;
export function cci(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new CCI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
