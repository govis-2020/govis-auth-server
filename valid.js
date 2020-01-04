const puppeteer = require("puppeteer");

const valid = async (id, password) => {
  const url = "https://job.korea.ac.kr/user/login/login/initLogin.do";
  const browser = await puppeteer.launch({ headless: false });

  //브라우저, 페이지 초기화
  const page = await browser.newPage();

  let result = false;
  try {
    //실패, 성공 프로미스 생성
    page.on("dialog", async dialog => {
      // console.log(dialog.message())
      await dialog.dismiss();
      const message = dialog.message();

      if (message.includes("다시 확인하세요.")) {
        result = false;
      }
    });

    //URL 이동
    await page.goto(url, {
      timeout: 10000
    });
    await page.waitForSelector("#loginIdK", {
      timeout: 10000
    });
    await page.waitForSelector("#loginPwdK", {
      timeout: 10000
    });
    await page.waitForSelector("#login_form_student .btn_login", {
      timeout: 10000
    });

    //페이지 뜰때까지 대기 & 타이핑, 로그인 클릭
    await page.type("#loginIdK", id);
    await page.type("#loginPwdK", password);
    await page.click("#login_form_student .btn_login");

    try {
      const bSuccess = await page.waitForSelector("#main", {
        timeout: 5000
      });
      if (bSuccess) result = true;
    } catch (e) {}

    return !!result;
  } catch (e) {
    console.log(e);
    throw new Error("CHECKUP");
  } finally {
    //메모리 누수 방지
    await page.close();
    await browser.close();
  }
};

module.exports = valid;
