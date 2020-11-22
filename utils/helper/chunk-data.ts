export function chunk(array: any[] = [], chunkSize: number) {
    const output = [];
    let arrayIndex = 0;
    while (arrayIndex < array.length) {
        output.push(array.slice(arrayIndex, arrayIndex += chunkSize));
    }
    return output;
}
