export const Time = {
    search(fn: (arr: number[], target: number) => number, arr: number[], pos: number): number {
        const start = performance.now();
        const result = fn(arr, pos);
        return performance.now() - start;
    },

    sort(fn: (arr: number[]) => number[], arr: number[]): [number, number[]] {
        const start = performance.now();
        const result = fn(arr);
        return [performance.now() - start, result];
    }
};