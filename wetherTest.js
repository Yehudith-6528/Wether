const puppeteer = require('puppeteer');

const screenshot = 'wether_check_str_search.png'
try {
    (async () => {

        const browser = await puppeteer.launch()
        let page = await browser.newPage();
        await page.goto('http://localhost:3000/');

        await page.type('input', 'georgia')
        await page.screenshot({ path: 'wether_search_test.ticketExist.png' })
        const pullovers = await page.$$('a.a-link-normal.a-text-normal')
        await page.screenshot({ path: screenshot })
        console.log('See screenshot: ' + screenshot)
    })()
} catch (err) {
    console.error(err)
}