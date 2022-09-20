export const cookieDecode = (cookie: string) => JSON.parse(decodeURI(cookie));
