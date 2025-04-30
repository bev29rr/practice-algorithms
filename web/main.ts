import './modules/sorting.ts';
import { Sort } from './modules/sorting.ts';

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sorting!");
    console.log(Sort.insertion([8, 5, 4]));
    console.log(Sort.merge([8, 5, 4]));
});