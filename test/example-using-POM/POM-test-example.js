const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const HomePage = require('./pages/homePage');
const ResultsPage = require('./pages/resultsPage');

describe('Duck Duck Go search using Puppeteer with Page Object Model', () => {

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
        const homePage = new HomePage(page);
        expect(await homePage.getTitle()).to.eql('DuckDuckGo — Privacy, simplified.');
    });

    it('should show a list of results when searching actual word', async () => {
        const homePage = new HomePage(page);
        await homePage.searchFor('puppeteer');
        const resultsPage = new ResultsPage(page);
        expect(await resultsPage.getNumberOfLinks()).to.be.greaterThan(0);
    });

    it('should show a warning when searching fake word', async () => {
        const homePage = new HomePage(page);
        await homePage.searchFor('pupuppeppeteerteer');
        const resultsPage = new ResultsPage(page);
        expect(await resultsPage.checkIfResultsExist()).to.be.false;
    });

});
