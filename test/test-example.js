const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('sample test', () => {

    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('https://google.com');
    });

    afterEach(async () => {
        await browser.close();
    });

    it('should have the correct page title', async () => {
        expect(await page.title()).to.eql('Google');
    });

    it('should show a list of results when searching actual word', async () => {
        await page.type('input[id=lst-ib]', 'puppeteer');
        await page.click('input[type="submit"]');
        await page.waitForSelector('h3 a');
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h3 a'));
        });
        expect(links.length).to.be.greaterThan(0);
    });

    it('should show a warning when searching fake word', async () => {
        await page.type('input[id=lst-ib]', 'pupuppeppeteerteer');
        await page.click('input[type="submit"]');
        await page.waitForSelector('div[class=mnr-c]');
        const text = await page.evaluate(() => {
            return document.querySelector('div[class=mnr-c]').textContent;
        });
        expect(text).to.contain('La búsqueda de pupuppeppeteerteer no obtuvo ningún resultado.');
    });

});
