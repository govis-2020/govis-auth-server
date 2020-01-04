const cron = require("cron");
const CronJob = cron.CronJob;
const models = require("../config/models");
const { Op } = require("sequelize");

module.exports = {
  //새로 크롤링한 보드에 키워드를 탐색 후, BoardKeyword 테이블을 채운다.
  //채움과 동시에 해당 키워드를 구독하고 있는 유저들은 Push Notification을 날려준다.
  checkBoardKeyword(time, context) {
    new CronJob(
      time,
      async function() {
        const boards = await models.board.findAll({
          limit: 10,
          where: { check: false }
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

          board.check = true;
          await board.save();
        }
      },
      null,
      true,
      "Asia/Seoul",
      context
    );
  }
};
