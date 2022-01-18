/**
 * Created by cwouter on 2/3/2020.
 */
let CrossOver from '../../src/Utils/CrossOver').CrossOver;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";

let input = {
    lineA: [3, 4, 5, 6, 7, 2, 7, 5, 7, 2, 5, 5, 7, 2, 5, 5, 2, 7],
    lineB: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

let expectedResults = [false, false, false, true, false, true, true, false, false, true, false, false, true, true, false, false, false, true];

Deno.test('Cross Over', function() {
    'use strict';
    Deno.test('should calculate positive and negative line cross over using the calculate method', function() {
        assertEquals(CrossOver.calculate(input), expectedResults);
    });

    Deno.test('should calculate positive and negative line cross over by using getResult', function() {
        let crossOver = new CrossOver(input);
        assertEquals(crossOver.getResult(), expectedResults, 'Wrong Results while calculating next bar');
    });

    Deno.test('should calculate positive and negative line cross over by using nextValue', function() {
        let crossOver = new CrossOver({lineA: [], lineB: []});
        let results = [];
        input.lineA.forEach((value, index) => {
            let result = crossOver.nextValue(input.lineA[index], input.lineB[index]);
            results.push(result)
        });
        assertEquals(results, expectedResults, 'Wrong Results while getting results');
    })
});


