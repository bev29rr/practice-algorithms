export const Sort = {
    merge(arr: number[]): any {
        if (arr.length <= 1) return arr;

        // divide
        const mid = Math.floor(arr.length / 2);
        const left = Sort.merge(arr.slice(0, mid));
        const right = Sort.merge(arr.slice(mid));
        
        function mergeArr(left: number[], right: number[]): number[] {
            const result: number[] = [];
            let i = 0, j = 0;

            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }

            return result.concat(left.slice(i)).concat(right.slice(j));
        }

        return mergeArr(left, right);
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

    bubble(arr: number[]): number[] {
        const result = [...arr];
        const n = result.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (result[j] > result[j + 1]) {
                    [result[j], result[j + 1]] = [result[j + 1], result[j]];
                }
            }
        }
        return result;
    },

    quick(arr: number[]): number[] {
        if (arr.length <= 1) return arr;

        const pivot = arr[0];
        const left = arr.slice(1).filter(x => x <= pivot);
        const right = arr.slice(1).filter(x => x > pivot);

        return [...Sort.quick(left), pivot, ...Sort.quick(right)];
    }
};

console.log('hi');