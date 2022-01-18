/**
 * Created by cwouter on 1/3/2020.
 */
let CrossUp from '../../src/Utils/CrossUp').CrossUp;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";

let input = {
    lineA: [3, 4, 5, 6, 7, 2, 7, 5, 7, 2, 5, 5, 7, 2, 5, 5, 2, 7],
    lineB: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

let expectedResults = [false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, true];

Deno.test('Cross Up', function() {
    'use strict';
    Deno.test('should calculate positive line cross over using the calculate method', function() {
        assertEquals(CrossUp.calculate(input), expectedResults);
    });

    Deno.test('should calculate positive line cross over by using getResult', function() {
        let crossUp = new CrossUp(input);
        assertEquals(crossUp.getResult(), expectedResults, 'Wrong Results while calculating next bar');
    });

    Deno.test('should calculate positive line cross over by using nextValue', function() {
        let crossUp = new CrossUp({lineA: [], lineB: []});
        let results = [];
        input.lineA.forEach((value, index) => {
            let result = crossUp.nextValue(input.lineA[index], input.lineB[index]);
            results.push(result)
        });
        assertEquals(results, expectedResults, 'Wrong Results while getting results');
    })
});


