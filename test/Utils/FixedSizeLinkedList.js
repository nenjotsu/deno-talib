/**
 * Created by AAravindan on 5/7/16.
 */
"use strict";
var FixedSizeLinkedList = require("../../lib/Utils/FixedSizeLinkedList").default;
var assert = require('assert');

var linkedList;
var size = 10;

describe('Fixed Size Linked List', function() {
  beforeEach(function() {
    linkedList = new FixedSizeLinkedList(size, true, true, true);
  });

  it('Should maintain only the fixed size', function() {
    for(let i=1; i<20; i++) {
      linkedList.push(i.toString())
    }
    assert.equal(linkedList.length, size);
  });

  it('Should not popup if there is not enough', function(){
    for(let i=1; i<=10; i++) {
      linkedList.push(i.toString())
    }
    assert.equal(linkedList.length, size);
    assert.equal(linkedList.head, '1');
    assert.equal(linkedList.tail, '10');
    linkedList.push('11');
    assert.equal(linkedList.lastShift, '1');
    assert.equal(linkedList.head, '2');
    assert.equal(linkedList.tail, '11');
    linkedList.push('12');
    assert.equal(linkedList.lastShift, '2');
    assert.equal(linkedList.head, '3');
    assert.equal(linkedList.tail, '12');
  })

  it('Should popup out the first excess to the lastShift', function(){
    for(let i=1; i<=11; i++) {
      linkedList.push(i.toString())
    }
    assert.equal(linkedList.length, size);
    assert.equal(linkedList.lastShift, '1');
    linkedList.push('12');
    assert.equal(linkedList.lastShift, '2');
    assert.equal(linkedList.head, '3');
    assert.equal(linkedList.tail, '12');
    assert.equal(linkedList.length, size);
  });

  it('Should contain an iterator function', function(){
    for(let i=1; i<=11; i++) {
      linkedList.push(i.toString())
    }
    assert(linkedList.iterator, 'Iterator not found');
    var results = [];
    for(let values of linkedList.iterator()){
      results.push(values);
    }
    assert.deepEqual(['2','3','4','5','6','7','8','9','10','11'], results);
  })

  it('Should maintain period high before shift', function(){
    for(let i=1; i<=10; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodHigh, 10)
  });

  it('Should maintain period high after shift', function(){
    for(let i=1; i<=13; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodHigh, 13)
  })

  it('Should maintain period low before shift', function(){
    for(let i=1; i<=10; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodLow, 1)
  });

  it('Should maintain period low after shift', function(){
    for(let i=1; i<=14; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodLow, 5)
  })

  it('Should maintain sum if requested', function(){
    for(let i=1; i<=10; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodSum, (10 * 11)/2 )
  })
  
  it('Should maintain sum if requested', function(){
    for(let i=1; i<=14; i++) {
      linkedList.push(i)
    }
    assert.equal(linkedList.periodSum, 95)
  })
});