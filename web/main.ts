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
const answerText = document.getElementById("answer");

const submitBtn = document.getElementById("submit") as HTMLButtonElement | null;
let buttonState = 0;

let questions: [string, () => number[], Config][] = [
    ["A small array (n ≈ 1,000)", arrRange(1_000), { large: false }],
    ["A large array (n ≈ 1,000,000)", arrRange(1_000_000), { large: true }],
    ["A sorted large array (n ≈ 1,000,000)", arrRange(1_000_000, true), { large: true }],
    ["A small array (n ≈ 1,000) but with memory limitations", arrRange(1_000), { memCap: true }],
    ["A medium array (n ≈ 20,000) but with memory limitations", arrRange(20_000, true), { memCap: true }],
    ["A medium array (n ≈ 20,000) but it's the last item with memory limitations", arrRange(1_000), { memCap: true, pos: 1_000 - 1 }],
    ["A sorted small array (n ≈ 1,000) but it's the last item", arrRange(1_000, true), { pos: 1_000 - 1 }],
    ["A sorted small array (n ≈ 1,000) but it's the first item", arrRange(1_000, true), { pos: 0 }],
    ["A small array (n ≈ 1,000) but it's the last item", arrRange(1_000, true), { pos: 1_000 - 1 }],
    ["A medium array (n ≈ 20,000) but it's the last item", arrRange(20_000, true), { pos: 20_000 - 1 }]
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

function appendMessage(p1: [number, string], p2: [number, string], winner: string) {
    if (questionText) questionText.innerHTML = "";
    if (answerText) answerText.innerHTML = 
    `
        You chose: <b style="color: var(--main);">${p1[1]}</b> <br>
        You got: <b style="color: var(--main);">${p1[0].toPrecision(2)}</b>ms <br>
        I chose: <b style="color: var(--main);">${p2[1]}</b> <br>
        I got: <b style="color: var(--main);">${p2[0].toPrecision(2)}</b>ms <br>
        ${winner} won
    `;
}

function aiFuncs(large: boolean): [(arr: number[], target: number) => number, ((arr: number[]) => number[]) | null, string] {
    const choice = large ? Math.round(Math.random() * 1) : Math.round(Math.random() * 4);
    if (choice == 0) {
        return [Search.linear, null, "linear"];
    } else {
        let sorter: (arr: number[]) => number[];
        let algText = "";
        if (choice == 1) {
            sorter = Sort.merge;
            algText = "merge";
        } else if (choice == 2) {
            sorter = Sort.quick;
            algText = "quick";
        } else if (choice == 3) {
            sorter = Sort.insertion;
            algText = "insertion";
        } else {
            sorter = Sort.bubble;
            algText = "bubble";
        }
        return [Search.binary, sorter, `binary + ${algText}`];
    }
}

function finaliseButton() {
    if (submitBtn) submitBtn.innerHTML = "Start";
    buttonState = 0;
}

submitBtn?.addEventListener("click", () => {
    breakpoint: if (buttonState === 0) {
        submitBtn.innerHTML = "Submit";
        if (answerText) answerText.innerHTML = "";

        buttonState = 1;
        questionId = Math.floor(Math.random() * questions.length-1) + 1;
        const question = questions[questionId];
        const [q, ,] = question;

        if (questionText) {
            questionText.innerHTML = q;
        }
    } else if (buttonState === 1) {
        if (searcher && sorter) {
            const [, numArrFn, conf] = questions[questionId];
            let numberArr = numArrFn();
            let timePlayer = 0;
            let timeAi = 0;
            let algorithmText = "";

            let numPos = conf.pos ? conf.pos : Math.random(); //TODO: get real pos of num

            // human
            let p1Arr = structuredClone(numberArr);
            if (searcher.value === "linear") {
                timePlayer = Time.search(Search.linear, p1Arr, numPos);
                algorithmText = "linear";
            } else if (searcher.value === "binary") {
                let algText;
                if (sorter.value === "merge") {
                    if (conf.memCap === true) {
                        window.alert("Memory overload...");
                        finaliseButton();
                        break breakpoint;
                    }
                    [timePlayer, p1Arr] = Time.sort(Sort.merge, p1Arr);
                    algText = "merge";
                } else {
                    if (conf.large === true) {
                        window.alert("Preventing computer freeze, aborting...");
                        finaliseButton();
                        break breakpoint;
                    }
                    if (sorter.value === "insertion") {
                        [timePlayer, p1Arr] = Time.sort(Sort.insertion, p1Arr);
                        algText = "insertion";
                    } else if (sorter.value === "quick") {
                        [timePlayer, p1Arr] = Time.sort(Sort.quick, p1Arr);
                        algText = "quick";
                    } else {
                        [timePlayer, p1Arr] = Time.sort(Sort.bubble, p1Arr);
                        algText = "insertion";
                    }
                }

                timePlayer += Time.search(Search.linear, p1Arr, numPos);
                algorithmText = `binary + ${algText}`;
            }

            // ai
            const [aiSearcher, aiSorter, algorithmTextAi] = aiFuncs(conf.large || false);

            let p2Arr = structuredClone(numberArr);
            if (aiSorter !== null) [timeAi, p2Arr] = Time.sort(aiSorter, p2Arr);
            timeAi += Time.search(aiSearcher, p2Arr, numPos);

            let winner = timePlayer < timeAi ? "You": "I";

            appendMessage([timePlayer, algorithmText], [timeAi, algorithmTextAi], winner);
            setTimeout(() => window.alert(`${winner} Won!`), 20);

            finaliseButton();
        }
    }
});