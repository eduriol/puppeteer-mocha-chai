class ResultsPage {

    constructor(page) {
        this.page = page;
    }

    async getNumberOfLinks(page) {
        await this.page.waitForSelector('h2 a');
        const links = await this.page.evaluate(() => {
            return Array.from(document.querySelectorAll('h2 a'));
        });
        return links.length;
    }
    
    async checkIfResultsExist(page) {
        await this.page.waitForSelector('div[class=msg__wrap]');
        const text = await this.page.evaluate(() => {
            return document.querySelector('div[class=msg__wrap]').textContent;
        });
        return !text.includes('Not many results contain');
    }

}

module.exports = ResultsPage;