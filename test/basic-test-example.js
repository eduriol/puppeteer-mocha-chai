const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('Duck Duck Go search using basic Puppeteer', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('https://duckduckgo.com');
    });

    afterEach(async () => {
        await browser.close();
    });

    it('should have the correct page title', async () => {
        expect(await page.title()).to.eql('DuckDuckGo — Privacy, simplified.');
    });

    it('should show a list of results when searching actual word', async () => {
        await page.type('input[id=search_form_input_homepage]', 'puppeteer');
        await page.click('input[type="submit"]');
        await page.waitForSelector('h2 a');
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h2 a'));
        });
        expect(links.length).to.be.greaterThan(0);
    });

    it('should show a warning when searching fake word', async () => {
        await page.type('input[id=search_form_input_homepage]', 'pupuppeppeteerteer');
        await page.click('input[type="submit"]');
        await page.waitForSelector('div[class=msg__wrap]');
        const text = await page.evaluate(() => {
            return document.querySelector('div[class=msg__wrap]').textContent;
        });
        expect(text).to.contain('Not many results contain');
    });

});
