export const decodeUrl = (arr: string[]): string[] => {
    return arr.map((item) => {
        const decoded = decodeURIComponent(item);
        return decoded;
    });
};
