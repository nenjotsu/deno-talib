// deno-lint-ignore-file
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { SMA } from '../moving_averages/SMA.ts';
export class AwesomeOscillatorInput extends IndicatorInput {
}
export class AwesomeOscillator extends Indicator {
generator: Generator<number|undefined,never,any>;
static calculate: (input: { reversedInput: any; values?: any[]|undefined; open?: any[]|undefined; high?: any[]|undefined; low?: any[]|undefined; close?: any[]|undefined; volume?: any[]|undefined; timestamp?: any[]|undefined; }) => any;
    constructor(input: { high?: any; low?: any; fastPeriod?: any; slowPeriod?: any; format?: (v: any) => any; } | any) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var fastPeriod = input.fastPeriod;
        var slowPeriod = input.slowPeriod;
        var slowSMA = new SMA({ values: [], period: slowPeriod });
        var fastSMA = new SMA({ values: [], period: fastPeriod });
        this.result = [];
        this.generator = (function* () {
            var result;
            var tick;
            var medianPrice;
            var slowSmaValue;
            var fastSmaValue;
            // @ts-ignore
            tick = yield;
            while (true) {
                medianPrice = (tick.high + tick.low) / 2;
                slowSmaValue = slowSMA.nextValue(medianPrice);
                fastSmaValue = fastSMA.nextValue(medianPrice);
                if (slowSmaValue !== undefined && fastSmaValue !== undefined) {
                    result = fastSmaValue - slowSmaValue;
                }
                // @ts-ignore
                tick = yield result;
            }
        })();
        this.generator.next();
        highs.forEach((tickHigh: any, index: string|number) => {
            var tickInput = {
                high: tickHigh,
                low: lows[index],
            };
            var result = this.generator.next(tickInput);
            if (result.value != undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    ;
    nextValue(price: any) {
        var result = this.generator.next(price);
        if (result.value != undefined) {
            return this.format(result.value);
        }
    }
    ;
}
AwesomeOscillator.calculate = awesomeoscillator;
export function awesomeoscillator(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new AwesomeOscillator(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
