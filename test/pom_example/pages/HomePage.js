async function getTitle(page) {
    return page.title();
}

async function searchFor(page, word) {
    await page.type('input[id=lst-ib]', word);
    await page.click('input[type="submit"]');
}

module.exports = { getTitle, searchFor };
