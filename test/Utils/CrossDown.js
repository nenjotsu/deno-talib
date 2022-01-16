/**
 * Created by cwouter on 2/3/2020.
 */
let CrossDown = require('../../lib/Utils/CrossDown').CrossDown;
let assert = require('assert');

let input = {
    lineA: [7, 6, 5, 4, 3, 8, 3, 5, 3, 8, 5, 5, 3, 8, 5, 5, 8, 3],
    lineB: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

let expectedResults = [false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, true];

describe('Cross Down', function() {
    'use strict';
    it('should calculate negative line cross over using the calculate method', function() {
        assert.deepEqual(CrossDown.calculate(input), expectedResults);
    });

    it('should calculate negative line cross over by using getResult', function() {
        let crossDown = new CrossDown(input);
        assert.deepEqual(crossDown.getResult(), expectedResults, 'Wrong Results while calculating next bar');
    });

    it('should calculate negative line cross over by using nextValue', function() {
        let crossDown = new CrossDown({lineA: [], lineB: []});
        let results = [];
        input.lineA.forEach((value, index) => {
            let result = crossDown.nextValue(input.lineA[index], input.lineB[index]);
            results.push(result)
        });
        assert.deepEqual(results, expectedResults, 'Wrong Results while getting results');
    })
});


