const Koa = require("koa");
const send = require("koa-send");
// const pageRouter = require('./routers/dev-ssr')
const staticRouter = require("./routers/static.js");
const app = new Koa();
const path = require("path");
const isDev = process.env.NODE_ENV === "development";
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());

let pageRouter;
if (isDev) {
  pageRouter = require("./routers/dev-ssr");
} else {
  pageRouter = require("./routers/ssr");
}
app.use(async (ctx, next) => {
  try {
    console.log(`request width path ${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    if (isDev) {
      ctx.body = err.message;
    } else {
      ctx.body = "please try again later";
    }
  }
});
app.use(async (ctx, next) => {
  console.log(ctx.url, ctx.path, "------");
  if (ctx.path === "/favicon.ico") {
    await send(ctx, "/favicon.ico", { root: path.join(__dirname, "../") });
  } else {
    await next();
  }
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "3333";
app.listen(PORT, HOST, () => {
  console.log(`server lintening on ${HOST}:${PORT}`);
});
