import { type } from "arktype";

export const getComicPageValidator = type({
    comicUrl: 'string.base64',
});
