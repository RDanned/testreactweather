export const convertToCels = (temp: number): number => {
    return Number((temp - 273).toFixed(1));
};
