const express = require('express');
const puppeteer = require('puppeteer');
const whatsappBot = express.Router();

whatsappBot.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from backend im the whatsapp bot!' });
})

module.exports = whatsappBot;