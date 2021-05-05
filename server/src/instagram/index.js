const { chromium } = require('playwright');

class InstaBot {
  constructor() {
    this.url = "https://instagram.com/";
    this.browser;
    this.context;
  }

  async Login(username, password) {
    try {
      this.browser = await await chromium.launch({ headless: false, slowMo: 100 });
      this.context = await (await this.browser).newContext();
      const page = await (await this.context).newPage();
      await page.goto(`${this.url}accounts/login/`);

      await page.waitForSelector("#loginForm > div > div:nth-child(1) > div > label > input");
      await page.focus("#loginForm > div > div:nth-child(1) > div > label > input");
      await page.keyboard.type(username);
  
      await page.keyboard.press('Tab');
  
      await page.keyboard.type(password);
  
      await page.keyboard.press("Enter");

      try {
        await page.waitForSelector('#slfErrorAlert', { timeout: 5000 });

        await (await this.browser).close();

        return "Error";
      } catch (e) {
          if (e.message.includes('Please')) {
              return e;
          }
      }

      await page.waitForSelector("#react-root > section > main > div > div > div > section > div > button");
      await page.$eval("#react-root > section > main > div > div > div > section > div > button", button => button.click());

      await page.waitForSelector("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm");
      await page.$eval("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm", button => button.click());
  
      return { message: `Você está logado com ${username}` };
    } catch (error) {
      return error
    }
  }

  async getProfile(user) {
    try {
      const page = await (await this.context).newPage();
      await page.goto(`${this.url}${user}`);

      const profilePic = await page.$eval("#react-root > section > main > div > header > div > div > span > img", el => el.src);
      const name = await page.$eval("#react-root > section > main > div > header > section > div.nZSzR > h2", el => el.textContent);
      const bio = await page.$eval("#react-root > section > main > div > header > section > div.-vDIg > span", el => el.textContent);
      const publications =  await page.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span", el => el.textContent);
      const followers =  await page.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span", el => el.title);
      const following =  await page.$eval("#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span", el => el.textContent);
      const pics = await page.evaluate(() => Array.from(document.querySelectorAll('[class="FFVAD"]'), element => element.src));

      const array = await {"user": user, "profilePic": profilePic, "name": name, "bio": bio, "publicacoes": publications, "seguidores": followers, "seguindo": following, "pics": pics};

      await page.close();

      return array;
    } catch (error) {
      return error;
    }

  }

  async getProfilePics(user) {
    try {
      const page = await (await this.context).newPage();
      await page.goto(`${this.url}${user}`)
      
      const pics = await page.evaluate(() => Array.from(document.querySelectorAll('[class="FFVAD"]'), element => element.src));

      const array = await {"pics": pics};

      await page.close();

      return array;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new InstaBot;
