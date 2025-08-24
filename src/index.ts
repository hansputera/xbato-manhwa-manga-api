import { Hono } from "hono";
import { arktypeValidator } from "@hono/arktype-validator";
import { searchQueryValidator } from "./validators/search";
import { searchQuery } from "./services/search";
import { getComicPageValidator } from "./validators/comic";
import { getComicPage } from "./services/comic";

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

export default app;
