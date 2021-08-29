export function choice<Item = unknown>(arr?: Item[] | null) {
    if (!arr?.length) return null;
    return arr[Math.floor(Math.random() * arr.length)] ?? null;
}