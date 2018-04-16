class HomePage {

    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        return this.page.title();
    }

    async searchFor(word) {
        await this.page.type('input[id=search_form_input_homepage]', word);
        await this.page.click('input[type="submit"]');
    }

}

module.exports = HomePage;