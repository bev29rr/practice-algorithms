export const Search = {
    linear(arr: number[], target: number): number {
        for (let i = 0; i < arr.length; i++) {
            console.log(`index: ${i}`); // to slow down linear
            if (arr[i] === target) return i;
        }
      return -1;
    },
  
    binary(arr: number[], target: number): number {
        let low = 0;
        let high = arr.length - 1;
  
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
  
        return -1;
    }
};