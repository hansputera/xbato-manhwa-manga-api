import { fromBase64 } from "@jsonjoy.com/base64"
import { XBATO_URL } from "../const";
import { xbato } from "../libraries/xbato";

export const getComicPage = async (base64Url: string) => {
    const comicUrl = new TextDecoder().decode(fromBase64(base64Url));
    if (!comicUrl.startsWith(XBATO_URL))
    {
        throw new Error('Invalid comic URL');
    }

    const results = await xbato.fetchComicPage(comicUrl);
    if (!results) {
        throw new Error('Comic not found');
    }

    // TODO: implement data caching if supported by environment.

    const chapters = results.chapters.map(chapter => ({
        name: chapter.title,
        chapter: chapter.chapterTitle,
        url: chapter.url,
        published_at: chapter.publishedAt,
    }));

    return {
        prose: results.prose,
        chapters,
        image: results.imageUrl,
        extra_info: results.extraInfo,
    }
}