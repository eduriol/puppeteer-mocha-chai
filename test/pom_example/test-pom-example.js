const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('sample test with POM', () => {

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
        const { getTitle } = require('./pages/HomePage');
        expect(await getTitle(page)).to.eql('Google');
    });

    it('should show a list of results when searching actual word', async () => {
        const { searchFor } = require('./pages/HomePage');
        await searchFor(page, 'puppeteer');
        const { getNumberOfLinks } = require('./pages/ResultsPage');
        expect(await getNumberOfLinks(page)).to.be.greaterThan(0);
    });

    it('should show a warning when searching fake word', async () => {
        const { searchFor } = require('./pages/HomePage');
        await searchFor(page, 'pupuppeppeteerteer');
        const { checkIfResultsExist } = require('./pages/ResultsPage');
        expect(await checkIfResultsExist(page)).to.be.false;
    });

});
