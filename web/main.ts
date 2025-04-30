import './modules/sorting.ts';
import { Sort } from './modules/sorting.ts';

const searcher = document.getElementById("searcher") as HTMLSelectElement | null;
const sorter = document.getElementById("sorter") as HTMLSelectElement | null;
const sorterText = document.getElementById("sorter-text");
const questionText = document.getElementById("question");

const submitBtn = document.getElementById("submit") as HTMLButtonElement | null;
let buttonState = 0;

let questions: [string, () => void, boolean][] = [
    ["A small array (n ≈ 1,000)", () => {}, false],
    ["A large array (n ≈ 1,000,000)", () => {}, true],
    ["A sorted large array (n ≈ 1,000,000)", () => {}, true],
    ["A small array (n ≈ 1,000) but with memory limitations", () => {}, false]
]

function randomArr(size: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < size; i++) {
        result.push(Math.random());
    }
    return result;
}

function timeAlg(fn: (arr: number[]) => number[], params: number[]): [number, number[]] {
    const start = performance.now();
    const result = fn(params);
    return [performance.now() - start, result];
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

submitBtn?.addEventListener("click", () => {
    if (buttonState === 0) {
        submitBtn.innerHTML = "Submit";
        buttonState = 1;
        let questionId = Math.floor(Math.random() * questions.length-1) + 1;
        const question = questions[questionId];
        const [q, ,] = question;

        if (questionText) {
            questionText.innerHTML = q;
        }
    } else if (buttonState === 2) {
        if (searcher && sorter) {
            if (searcher.value === "linear") {
                
            } else if (searcher.value === "binary") {
                
            }
        }
    }
});