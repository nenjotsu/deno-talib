import { getConfig } from '../config.ts';
export function format(v:number):number {
    // @ts-ignore
    let precision:number = getConfig('precision');
    if(precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}