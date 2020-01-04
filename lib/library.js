// 도서관
const puppeteer = require("puppeteer");

module.exports = async function(library_type) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //library_100   : 공지사항
  //library_101   : 학술정보
  //library_102   : 일반 + 시설

  let _type = library_type.split("_");
  _type = _type[1];

  // Access to page
  await page.goto(`https://library.korea.ac.kr/bbs/list/${_type}`);

  const total_pagings = await page.evaluate(args => {
    let tmp = document
      .querySelector("div#searchCnt")
      .children[1].querySelector("strong")
      .innerText.split("/");
    return parseInt(tmp[1]);
  });

  const articles = [];

  // 1차적으로 링크를 먼저 따옴. 네비게이션 오류 방지
  for (let i = 1; i <= total_pagings; i++) {
    await page.goto(`https://library.korea.ac.kr/bbs/list/${_type}?pn=${i}`);

    const result = await page.evaluate(args => {
      const articles = [];

      document.querySelectorAll("td.title").forEach((v, i) => {
        const article = {};

        article.title = v.querySelector("a");

        if (article.title == null) return;
        else article.title = article.title.innerText.trim();

        article.href = v.querySelector("a").href;
        article.type = "library_100";

        let tmp = article.href;
        tmp = tmp.split("_");
        tmp = tmp[1].split("?");
        tmp = tmp[0];

        article.articleId = tmp;

        articles.push(article);
      });

      return articles;
    });

    articles.push(...result);
  }

  //console.log(articles);

  const articlePage = await browser.newPage();
  for (let article of articles) {
    await articlePage.goto(article.href);

    //본문 내용 태그 포함 원시 형태로 추출
    const content = await articlePage.$eval(
      "div.questionBody",
      element => element.innerHTML
    );
    article.content = content;

    //작성 일자 추출
    const date = await articlePage.$eval("dd.questionDate", element =>
      element.innerText.trim()
    );
    article.crwalCreateAt = date;

    //첨부파일 (이름, 링크)
    const attachs = await articlePage.evaluate(args => {
      const attachs = [];
      document.querySelectorAll("div.divAddfiles dd a").forEach((v, i) => {
        const attach = {};
        attach.name = v.innerText.trim();
        attach.link = v.href;
        attachs.push(attach);
      });
      return attachs;
    });
    article.attach = JSON.stringify(attachs);
    delete article.href;
  }

  await browser.close();
  return articles;
};
