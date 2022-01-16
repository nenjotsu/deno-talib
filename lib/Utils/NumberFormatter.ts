import { getConfig } from '../config.ts';
export function format(v: number) {
    let precision = getConfig('precision');
    if (precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}
