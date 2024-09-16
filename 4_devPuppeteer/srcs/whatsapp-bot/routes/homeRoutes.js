const path = require('path');
const { initBrowser ,closeBrowser, getPage } = require('./botFiles/browserSetup.js');

let page;
const express = require("express");

const authRoutes = require('./botFiles/authRoutes');
const messageRoutes = require('./botFiles/messageRoutes');

// Création du routeur
const bot = express.Router();


// Définition des routes sur le routeur
bot.get('/', (req, res) => {
    res.send(`
  <h1>Hello World!</h1>
  <button onclick="location.href='/bot/about'">Go to About</button>
`);
});

bot.get('/about', async (req, res) => {
    page = await initBrowser();
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'home_connection.html'));
});


authRoutes(bot, getPage);
messageRoutes(bot, getPage);

bot.get('/close', async (res, req) => {
    await closeBrowser();
    res.send("browser closed");
});

module.exports = bot;