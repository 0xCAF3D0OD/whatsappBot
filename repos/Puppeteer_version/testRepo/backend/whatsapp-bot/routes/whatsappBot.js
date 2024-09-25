const express = require('express');
const puppeteer = require('puppeteer');
const whatsappBot = express.Router();

const { screenshot } = require('./whatsappBotUtils/botPageUtils');

whatsappBot.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from backend im the whatsapp bot!' });
})
whatsappBot.get('/', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto('https://web.whatsapp.com/');

    // Set screen size.
    await page.setViewport({width: 1080, height: 1024});
    await screenshot(page, 'whatsapp');

    await browser.close();
    
})
module.exports = whatsappBot;