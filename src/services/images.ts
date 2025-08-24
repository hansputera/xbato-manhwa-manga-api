import { fromBase64 } from "@jsonjoy.com/base64";
import { XBATO_URL } from "../const";
import { xbato } from "../libraries/xbato";

export const getChapterImages = async (base64Url: string) => {
    const chapterUrl = new TextDecoder().decode(fromBase64(base64Url));
    if (!chapterUrl.startsWith(XBATO_URL))
    {
        throw new Error('Invalid chapter URL');
    }
    
    const results = await xbato.fetchChapterImages(chapterUrl);
    if (!results) {
        throw new Error('Chapter not found');
    }

    return results;
}