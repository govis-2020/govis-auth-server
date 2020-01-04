const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("koa2-cors");
const Router = require("koa-router");

const app = new Koa();

const valid = require("./valid");

const models = require("./config/models");

app.use(koaBody());

app.use(cors());

const router = new Router();

router.get("/", async ctx => {
  const user = await models.User.findOne();
  console.log(user);
  ctx.body = "OK";
});

router.post("/", async ctx => {
  const { id, password } = ctx.request.body;
  const result = await valid(id, password);

  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3005);

console.log("서버 실행 3005");
