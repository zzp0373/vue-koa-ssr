const ejs = require("ejs");
module.exports = async (ctx, renderer, template) => {
  // console.log(9, ctx);
  ctx.headers["ContentType"] = "text/html";
  const context = { url: ctx.path };
  try {
    const appString = await renderer.renderToString(context);
    console.log(context.renderScripts(), 11);
    const { title } = context.meta.inject();
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    });
    ctx.body = html;
  } catch (err) {
    // console.log("renderer err", err);
    throw err;
  }
};
