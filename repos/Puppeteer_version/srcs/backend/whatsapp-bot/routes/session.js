const express = require('express');
const browserState = require('../controller/browserState')

// const { initializeBrowser } = require('../controller/initializeBrowser');
const { consoleLog, screenshot} = require('../controller/botPageUtils')
const session = express.Router();

session.get('/', async (req, res) => {
 try {
     consoleLog(null, null, 'hello');

     const WhatsappSessionPage = browserState.getWhatsappPage();
     await WhatsappSessionPage.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

     consoleLog(null, WhatsappSessionPage, 'whatsapp session');
     await screenshot(WhatsappSessionPage, 'session');

 } catch (error) {
     console.error(`Error during access session: ${error}`);
 }
})


module.exports = session;
