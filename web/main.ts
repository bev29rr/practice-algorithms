import './modules/sorting.ts';
import { Sort } from './modules/sorting.ts';

const searcher = document.getElementById("searcher") as HTMLSelectElement | null;
const sorter = document.getElementById("sorter") as HTMLSelectElement | null;
const sorterText = document.getElementById("sorter-text");
const questionText = document.getElementById("question");

const submitBtn = document.getElementById("submit") as HTMLButtonElement | null;
let buttonState = 0;

let questions: [string, () => void][] = [
    ["A small array (n ≈ 1,000)", () => {}],
    ["A large array (n ≈ 1,000,000)", () => {}],
    ["A sorted large array (n ≈ 1,000,000)", () => {}]
]

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

submitBtn?.addEventListener("click", () => {
    if (buttonState === 0) {
        submitBtn.innerText = "Submit";
        buttonState = 1;
        let questionId = Math.floor(Math.random() * questions.length-1) + 1;
        const question = questions[questionId];
        const [q, fn] = question;

        if (questionText) {
            questionText.innerHTML = q;
        }
    }
});