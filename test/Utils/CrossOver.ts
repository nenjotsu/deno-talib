/**
 * Created by cwouter on 2/3/2020.
 */
let CrossOver = require('../../lib/Utils/CrossOver').CrossOver;
let assert = require('assert');

let input = {
    lineA: [3, 4, 5, 6, 7, 2, 7, 5, 7, 2, 5, 5, 7, 2, 5, 5, 2, 7],
    lineB: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

let expectedResults = [false, false, false, true, false, true, true, false, false, true, false, false, true, true, false, false, false, true];

describe('Cross Over', function() {
    'use strict';
    it('should calculate positive and negative line cross over using the calculate method', function() {
        assert.deepEqual(CrossOver.calculate(input), expectedResults);
    });

    it('should calculate positive and negative line cross over by using getResult', function() {
        let crossOver = new CrossOver(input);
        assert.deepEqual(crossOver.getResult(), expectedResults, 'Wrong Results while calculating next bar');
    });

    it('should calculate positive and negative line cross over by using nextValue', function() {
        let crossOver = new CrossOver({lineA: [], lineB: []});
        let results = [];
        input.lineA.forEach((value, index) => {
            let result = crossOver.nextValue(input.lineA[index], input.lineB[index]);
            results.push(result)
        });
        assert.deepEqual(results, expectedResults, 'Wrong Results while getting results');
    })
});


