import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { Sort } from "../modules/sorting.ts";

const testCases = [
    { input: [5, 3, 8, 1], expected: [1, 3, 5, 8] },
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 2, 1, 1], expected: [1, 1, 2, 2] },
    { input: [9, -1, 3], expected: [-1, 3, 9] }
];

Deno.test("Sort.insertion()", () => {
    for (const { input, expected } of testCases) {
        assertEquals(Sort.insertion(input), expected);
    }
});