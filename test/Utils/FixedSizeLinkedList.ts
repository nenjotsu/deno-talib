/**
 * Created by AAravindan on 5/7/16.
 */
import FixedSizeLinkedList from "../../src/Utils/FixedSizeLinkedList.ts";
import {
  assertEquals,
  assert
} from "https://deno.land/std@0.121.0/testing/asserts.ts";

let linkedList: any;
let size = 10;

Deno.test("Fixed Size Linked List", function () {
  Deno.test("Should maintain only the fixed size", function () {
    linkedList = new FixedSizeLinkedList(size, true, true, true);
    for (let i = 1; i < 20; i++) {
      linkedList.push(i.toString());
    }
    assertEquals(linkedList.length, size);
  });

  Deno.test("Should not popup if there is not enough", function () {
    linkedList = new FixedSizeLinkedList(size, true, true, true);
    for (let i = 1; i <= 10; i++) {
      linkedList.push(i.toString());
    }
    assertEquals(linkedList.length, size);
    assertEquals(linkedList.head, "1");
    assertEquals(linkedList.tail, "10");
    linkedList.push("11");
    assertEquals(linkedList.lastShift, "1");
    assertEquals(linkedList.head, "2");
    assertEquals(linkedList.tail, "11");
    linkedList.push("12");
    assertEquals(linkedList.lastShift, "2");
    assertEquals(linkedList.head, "3");
    assertEquals(linkedList.tail, "12");
  });

  Deno.test("Should popup out the first excess to the lastShift", function () {
    linkedList = new FixedSizeLinkedList(size, true, true, true);
    for (let i = 1; i <= 11; i++) {
      linkedList.push(i.toString());
    }
    assertEquals(linkedList.length, size);
    assertEquals(linkedList.lastShift, "1");
    linkedList.push("12");
    assertEquals(linkedList.lastShift, "2");
    assertEquals(linkedList.head, "3");
    assertEquals(linkedList.tail, "12");
    assertEquals(linkedList.length, size);
  });

  Deno.test("Should contain an iterator function", function () {
    linkedList = new FixedSizeLinkedList(size, true, true, true);
    for (let i = 1; i <= 11; i++) {
      linkedList.push(i.toString());
    }
    assert(linkedList.iterator, "Iterator not found");
    let results = [];
    for (let values of linkedList.iterator()) {
      results.push(values);
    }
    assertEquals(["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], results);
  });

  Deno.test("Should maintain period high before shift", function () {
    for (let i = 1; i <= 10; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodHigh, 10);
  });

  Deno.test("Should maintain period high after shift", function () {
    for (let i = 1; i <= 13; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodHigh, 13);
  });

  Deno.test("Should maintain period low before shift", function () {
    for (let i = 1; i <= 10; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodLow, 1);
  });

  Deno.test("Should maintain period low after shift", function () {
    for (let i = 1; i <= 14; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodLow, 5);
  });

  Deno.test("Should maintain sum if requested", function () {
    for (let i = 1; i <= 10; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodSum, (10 * 11) / 2);
  });

  Deno.test("Should maintain sum if requested", function () {
    for (let i = 1; i <= 14; i++) {
      linkedList.push(i);
    }
    assertEquals(linkedList.periodSum, 95);
  });
});
