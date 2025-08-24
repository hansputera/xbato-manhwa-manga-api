import { toBase64 } from "@jsonjoy.com/base64";
import { xbato } from "../libraries/xbato"

export const searchQuery = async (query: string) => {
    const results = await xbato.search(query);
    return results.map(comic => ({
        id: comic.comicId,
        url: comic.url,
        url_detail: toBase64(new TextEncoder().encode(comic.url)),
        image: comic.get('urlCoverOri'),
        authors: comic.get('authors'),
        alternative_names: comic.get('altNames'),
        dates: {
            created: comic.get('dateCreate'),
            modified: comic.get('dateModify'),
        },
        genres: comic.get('genres'),
        title: comic.get('name'),
        languages: {
            original: comic.get('origLang'),
            translation: comic.get('tranLang'),
        },
        statuses: {
            bato: comic.get('uploadStatus'),
            original: comic.get('originalStatus'),
        },
        stats: {
            score_avg: comic.get('stat_score_avg'),
            reviews: comic.get('stat_count_reviews'),
            votes: comic.get('stat_count_votes'),
        },
        read_direction: comic.get('readDirection'),
        artists: comic.get('artists'),
        last_chapter: comic.get('last_chapterNodes')?.[0]?.chaNum,
    }));
}