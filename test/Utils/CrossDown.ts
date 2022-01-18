/**
 * Created by cwouter on 2/3/2020.
 */
let CrossDown from '../../src/Utils/CrossDown').CrossDown;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";

let input = {
    lineA: [7, 6, 5, 4, 3, 8, 3, 5, 3, 8, 5, 5, 3, 8, 5, 5, 8, 3],
    lineB: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

let expectedResults = [false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, true];

Deno.test('Cross Down', function() {
    'use strict';
    Deno.test('should calculate negative line cross over using the calculate method', function() {
        assertEquals(CrossDown.calculate(input), expectedResults);
    });

    Deno.test('should calculate negative line cross over by using getResult', function() {
        let crossDown = new CrossDown(input);
        assertEquals(crossDown.getResult(), expectedResults, 'Wrong Results while calculating next bar');
    });

    Deno.test('should calculate negative line cross over by using nextValue', function() {
        let crossDown = new CrossDown({lineA: [], lineB: []});
        let results = [];
        input.lineA.forEach((value, index) => {
            let result = crossDown.nextValue(input.lineA[index], input.lineB[index]);
            results.push(result)
        });
        assertEquals(results, expectedResults, 'Wrong Results while getting results');
    })
});


