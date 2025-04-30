import './modules/sorting.ts';
import { Sort } from './modules/sorting.ts';

const searcher = document.getElementById("searcher") as HTMLSelectElement | null;
const sorter = document.getElementById("sorter") as HTMLSelectElement | null;
const sorterText = document.getElementById("sorter-text");

function randomArr(size: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < size; i++) {
        result.push(Math.random());
    }
    return result;
}

function timeAlg(fn: (arr: number[]) => number[], params: number[]): number {
    const start = performance.now();
    fn(params);
    return performance.now() - start;
}

searcher?.addEventListener("change", () => {
    if (searcher.value === "linear") {
        if (sorter && sorterText) { 
            sorter.disabled = true;
            sorterText.style.color = 'var(--disabled)';
        }
      } else {
        if (sorter && sorterText) { 
            sorter.disabled = false;
            sorterText.style.color = 'white';
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sorting!");
    //console.log(timeAlg(Sort.insertion, randomArr(100000)));
    console.log(Sort.merge([8, 5, 4]));
});