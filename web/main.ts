import './modules/sorting.ts';
import './modules/searching.ts';
import { Config } from './modules/config.ts';
import { Sort } from './modules/sorting.ts';
import { Search } from './modules/searching.ts';
import { Time } from './modules/time.ts';

let questionId = 0;

const searcher = document.getElementById("searcher") as HTMLSelectElement | null;
const sorter = document.getElementById("sorter") as HTMLSelectElement | null;
const sorterText = document.getElementById("sorter-text");
const questionText = document.getElementById("question");

const submitBtn = document.getElementById("submit") as HTMLButtonElement | null;
let buttonState = 0;

let questions: [string, () => number[], Config][] = [
    ["A small array (n ≈ 1,000)", arrRange(1_000), { large: false }],
    ["A large array (n ≈ 1,000,000)", arrRange(1_000_000), { large: true }],
    ["A sorted large array (n ≈ 1,000,000)", arrRange(1_000_000, true), { large: true }],
    ["A small array (n ≈ 1,000) but with memory limitations", arrRange(1_000), { memCap: true }]
]

function arrRange(n: number, sort = false): () => number[] {
    const [n_range, n_avg] = [n * 9/10, n * 1/10];
    if (sort) return () => { return randomArr(Math.floor(Math.random() * n_range) + n_avg).sort(); };
    return () => { return randomArr(Math.floor(Math.random() * n_range) + n_avg); };
}

function randomArr(size: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < size; i++) {
        result.push(Math.random());
    }
    return result;
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
        questionId = Math.floor(Math.random() * questions.length-1) + 1;
        const question = questions[questionId];
        const [q, ,] = question;

        if (questionText) {
            questionText.innerHTML = q;
        }
    } else if (buttonState === 2) {
        if (searcher && sorter) {
            const [, fn, conf] = questions[questionId];
            let numberArr = fn();
            let searchTime = 0;
            let sortTime = 0;

            let numPos = numberArr.length - 1; //TODO: get real pos of num

            if (searcher.value === "linear") {
                searchTime = Time.search(Search.linear, numberArr, numPos);
            } else if (searcher.value === "binary") {
                
            }
            window.alert(searchTime);
        }
    }
});