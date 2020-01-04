// 정보광장
const puppeteer = require("puppeteer");

module.exports = async function(cs_type) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  //notice_under   : 공지사항
  //cs-faq      : FAQ
  //cs-news     : 행사 및 소식
  //cs-course   : 진로정보

  await page.goto(
    `https://cs.korea.ac.kr/cs/board/${cs_type}.do?mode=list&&articleLimit=600&article.offset=0`
  );

  const articles = await page.evaluate(args => {
    const articles = [];

    // article-title, href
    document.querySelectorAll("div.t_list li").forEach((v, i) => {
      const article = {};

      article.title = v.querySelector("a").innerText.trim();
      article.href = v.querySelector("a").href;

      let tmp = v.querySelector("span").innerText.trim();
      article.crawlCreatedAt = tmp
        .substr(tmp.length - 10, 10)
        .replaceAll(".", "-");

      articles.push(article);
    });

    return articles;
  });

  const articlePage = await browser.newPage();
  for (let article of articles) {
    await articlePage.goto(article.href);

    // 본문 내용 태그 포함 원시 형태로 추출
    const content = await articlePage.$eval(
      "div.article-text",
      element => element.innerHTML
    );
    article.content = content;

    // 첨부파일 (이름, 링크)
    const attachs = await articlePage.evaluate(args => {
      const attachs = [];
      document.querySelectorAll("a.down").forEach((v, i) => {
        const attach = {};
        attach.name = v.innerText.trim();
        attach.link = v.href;
        attachs.push(attach);
      });
      return attachs;
    });
    article.attach = JSON.stringify(attachs);

    let a = article.href;
    let aa = a.split("&");
    a = aa[1];
    aa = a.split("=");
    a = aa[1];

    article.articleId = a;
    article.type = cs_type;
    delete article.href;
  }

  await browser.close();
  return articles;
};
