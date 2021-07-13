import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

if (!process.env.USER || !process.env.PASS) {
  /* eslint-disable no-console */
  console.error('\x1b[31m');
  console.error('no USER and/or PASS set, try to exec like:');
  console.error(`USER=p.perezp.2020 PASS=xxxxxxxx npm run ${process.env.npm_lifecycle_event || 'all'}`);
  console.error('\x1b[0m');
  process.exit(0);
}

async function scrapper() {
  const baseUrl = 'https://www.aulavirtual.urjc.es/moodle/grade/report/user/index.php?id=164935';
  const user = process.env.USER;
  const pass = process.env.PASS;

  const browser = await puppeteer.launch({ headless: false });

  try {
    let activePages = await browser.pages();
    let page = activePages[activePages.length - 1];

    await page.setViewport({ width: 1199, height: 900 });
    await page.goto(baseUrl);

    const [userInput] = await page.$$('input#username');
    const [passInput] = await page.$$('input#password');
    const [loginButton] = await page.$$('button#loginbtn');

    await userInput.type(user);
    await passInput.type(pass);
    await loginButton.click();

    activePages = await browser.pages();
    page = activePages[activePages.length - 1];

    await page.waitForSelector('a[title="Informe general"]');

    const [generalButton] = await page.$$('a[title="Informe general"]');
    await generalButton.click();

    activePages = await browser.pages();
    page = activePages[activePages.length - 1];

    await page.waitForSelector('a.active[title="Informe general"]');

    const tabs = await page.$$('td.cell a');
    const allResults = {};
    for (const tab of tabs) {
      await tab.click({ button: 'middle' });

      activePages = await browser.pages();
      const page2 = activePages[activePages.length - 1];
      await page2.setViewport({ width: 1199, height: 900 });
      await page2.bringToFront();
      await page2.waitForSelector('table');
      await page2.waitForSelector('table tr');

      const results = await page2.evaluate(() => {
        const trs = document.querySelectorAll('table tr');
        const data = [];
        trs.forEach(tr => {
          const title = tr.querySelector('a.gradeitemheader');
          if (title) {
            const tds = tr.querySelectorAll('td');
            data.push({
              subject: document.querySelectorAll('.column-itemname')[1].textContent,
              practice: title.textContent,
              weighing: tds[0].textContent,
              mark: tds[1].textContent,
              range: tds[2].textContent,
              percentage: tds[3].textContent,
              feedback: tds[4].textContent,
              contributesTotal: tds[5].textContent,
            });
          }
        });
        return data;
      });
      await page2.close();
      if (results[0]) {
        allResults[results[0].subject] = results;
      }
    }

    fs.writeFileSync(path.resolve('reports', 'data.json'), JSON.stringify(allResults, null, 2));

    await page.close();
    await browser.close();
  } catch (error) {
    console.error(error);
    await browser.close();
  }
}

scrapper();
