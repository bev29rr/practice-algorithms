import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { Search } from "../modules/searching.ts";

Deno.test("Search.linearSearch()", () => {
    const arr = [2, 4, 6, 8, 10];
    assertEquals(Search.linearSearch(arr, 6), 2);
    assertEquals(Search.linearSearch(arr, 2), 0);
    assertEquals(Search.linearSearch(arr, 10), 4);
    assertEquals(Search.linearSearch(arr, 5), -1);
});

Deno.test("Search.binarySearch()", () => {
    const arr = [1, 3, 5, 7, 9];
    assertEquals(Search.binarySearch(arr, 5), 2);
    assertEquals(Search.binarySearch(arr, 1), 0);
    assertEquals(Search.binarySearch(arr, 9), 4);
    assertEquals(Search.binarySearch(arr, 6), -1);

    assertEquals(Search.binarySearch([], 1), -1);
    assertEquals(Search.binarySearch([3], 3), 0);
    assertEquals(Search.binarySearch([3], 1), -1);
});