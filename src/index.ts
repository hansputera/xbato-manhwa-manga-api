import { Hono } from "hono";
import { arktypeValidator } from "@hono/arktype-validator";
import { searchQueryValidator } from "./validators/search";
import { searchQuery } from "./services/search";
import { getComicPageValidator } from "./validators/comic";
import { getComicPage } from "./services/comic";
import { getChapterImagesValidator } from "./validators/images";
import { getChapterImages } from "./services/images";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Search endpoint
app.get('/search', arktypeValidator('query', searchQueryValidator), async ctx => {
  const query = ctx.req.valid('query');
  const results = await searchQuery(query.query);

  return ctx.json({
    data: results,
  });
});

// Get comic page endpoint
app.get('/comic/:comicUrl', arktypeValidator('param', getComicPageValidator), async ctx => {
  const params = ctx.req.valid('param');
  const results = await getComicPage(params.comicUrl);

  return ctx.json({
    data: results,
  });
});

// Get chapter images endpoint
app.get('/images/:chapterUrl', arktypeValidator('query', getChapterImagesValidator), async ctx => {
  const queries = ctx.req.valid('query');
  const results = await getChapterImages(queries.chapterUrl);

  return ctx.json({
    data: results,
  });
});

export default app;
