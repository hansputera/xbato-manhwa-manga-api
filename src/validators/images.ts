import { type } from "arktype";

export const getChapterImagesValidator = type({
    chapterUrl: 'string.base64',
});
