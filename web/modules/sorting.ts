export const Sort = {
    merge(arr: number[]) {
        // divide
        
        function divide(arr) {
            if (arr.length < 2) return arr;
            let left = arr.splice(0, Math.floor(arr.length / 2));
            return divide([arr]);
        }

        // conquer
    },

    insertion(arr: number[]): number[] {
        const sorted = [...arr];
        for (let i = 1; i < sorted.length; i++) {
            let key = sorted[i];
            let j = i - 1;
            while (j >= 0 && sorted[j] > key) {
                sorted[j + 1] = sorted[j];
                j--;
            }
            sorted[j + 1] = key;
        }
        return sorted;
    },

    bubble() {

    },

    quick() {

    }
};

console.log('hi');