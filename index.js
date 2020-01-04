const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("koa2-cors");
const Router = require("koa-router");

const app = new Koa();

const valid = require("./valid");

const models = require("./config/models");
const { Op } = require("sequelize");

const { checkBoardKeyword } = require("./lib/cron");

app.use(koaBody());

app.use(cors());

const router = new Router();

router.get("/campus", async ctx => {
  const facilities = await models.campus_facility.findAll();

  ctx.body = facilities;
});

router.get("/", async ctx => {
  const boards = await models.board.findAll({
    limit: 10,
    where: { content: { [Op.like]: `%취업%` } }
  });

  const keywords = await models.keyword.findAll();

  for (let board of boards) {
    for (let keyword of keywords) {
      if (board.content.includes(keyword.name)) {
        await models.board_keyword.create({
          keywordId: keyword.id,
          boardId: board.id
        });
      }
    }
  }

  ctx.body = keywords;
});

router.post("/", async ctx => {
  const { id, password, userId } = ctx.request.body;
  const result = await valid(id, password);

  if (result) {
    const user = await models.user.findOne({ where: { user_id: userId } });
    user.is_valid = true;
    await user.save();
  }

  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3005);

checkBoardKeyword("*/5 * * * * *", {});

console.log("서버 실행 3005");
