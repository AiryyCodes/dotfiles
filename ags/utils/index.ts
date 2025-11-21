export function range(max: number): number[] {
    return Array.from({ length: max + 1 }, (_, i) => i);
}
