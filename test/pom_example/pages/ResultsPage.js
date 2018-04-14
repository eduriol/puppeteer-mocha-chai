async function getNumberOfLinks(page) {
    await page.waitForSelector('h3 a');
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h3 a'));
    });
    return links.length;
}

async function checkIfResultsExist(page) {
    await page.waitForSelector('div[class=mnr-c]');
    const text = await page.evaluate(() => {
        return document.querySelector('div[class=mnr-c]').textContent;
    });
    return !text.includes('no obtuvo ningún resultado.');
}

module.exports = { getNumberOfLinks, checkIfResultsExist };