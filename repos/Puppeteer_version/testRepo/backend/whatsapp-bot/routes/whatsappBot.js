const express = require('express');
const puppeteer = require('puppeteer');
const whatsappBot = express.Router();

const { screenshot, consoleLog } = require('./whatsappBotUtils/botPageUtils');

// whatsappBot.get('/api/test', (req, res) => {
//     res.json({ message: 'Hello from backend im the whatsapp bot!' });
// })

whatsappBot.get('/', async (req, res) => {

    const browser = await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const whatsappPage = await browser.newPage();

    consoleLog(whatsappPage, 'before goto');
    // Navigate the page to a URL.
    await whatsappPage.goto('https://web.whatsapp.com/');
    await whatsappPage.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });
    consoleLog(whatsappPage, 'after goto');
    await screenshot(whatsappPage, 'whatsapp');
    // // Set screen size.
    // await whatsappPage.setViewport({width: 1080, height: 1024});
    // await screenshot(whatsappPage, 'whatsapp');
    // await browser.close();

})
module.exports = whatsappBot;