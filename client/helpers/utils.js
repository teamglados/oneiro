export const sleep = (ms = 500) => new Promise(rslv => setTimeout(rslv, ms));
