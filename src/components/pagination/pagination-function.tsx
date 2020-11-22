
export interface PaginationOptions {
    pageSize: number;
    current: number;
    noOfSiblings?: number;
}

export function paginateFn(options: PaginationOptions): any[] {
    const { pageSize, noOfSiblings = 2, current } = options;


    const range = (from: number, to: number) => {
        return Array.from({length: to - from + 1}, (_v, i) => from + i);
    };


    const max = 2 * noOfSiblings + 5;
    const breakpoint = noOfSiblings + 3;

    const needEllipsis = pageSize > max;
    const pages = range(1, pageSize);

    if (!needEllipsis) return pages;

    if (current <= breakpoint) {
        const from = 1;
        const to = max - 2;
        return [...range(from, to), '...', pageSize];
    }

    if (current > pageSize - breakpoint) {
        const from = pageSize - (max - 3);
        const to = pageSize;
        return [1, '...', ...range(from, to)];
    }

    const from = current - noOfSiblings;
    const to = current + noOfSiblings;
    return [1, '...', ...range(from, to), '...', pageSize];
}
