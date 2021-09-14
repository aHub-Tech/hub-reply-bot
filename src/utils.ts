export function choice<Item = unknown>(arr?: Item[] | null) {
    if (!arr?.length) return null;
    return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

export function chunk<Item = unknown>(arr: Item[], len: number) {
    let chunks : Array<Array<Item>> = [];
    let n = arr.length;
    let i = 0;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

export function cmd(text: string) {
    if (!text) return '';
    return text.toLowerCase().slice(1).split(' ').shift() ?? '';
}