import { assertEquals } from "https://deno.land/std@0.213.0/assert/mod.ts";
import { Search } from "../modules/searching.ts";

Deno.test("Search.linearSearch()", () => {
    const arr = [2, 4, 6, 8, 10];
    assertEquals(Search.linear(arr, 6), 2);
    assertEquals(Search.linear(arr, 2), 0);
    assertEquals(Search.linear(arr, 10), 4);
    assertEquals(Search.linear(arr, 5), -1);
});

Deno.test("Search.binarySearch()", () => {
    const arr = [1, 3, 5, 7, 9];
    assertEquals(Search.binary(arr, 5), 2);
    assertEquals(Search.binary(arr, 1), 0);
    assertEquals(Search.binary(arr, 9), 4);
    assertEquals(Search.binary(arr, 6), -1);

    assertEquals(Search.binary([], 1), -1);
    assertEquals(Search.binary([3], 3), 0);
    assertEquals(Search.binary([3], 1), -1);
});