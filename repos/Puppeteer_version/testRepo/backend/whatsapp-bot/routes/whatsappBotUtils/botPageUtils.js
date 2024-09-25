const express = require('express');
const path = require('path');
const config = require('../../pathConfig');

async function screenshot(page, imageName) {
    const imagePath = path.join(config.imageDir, `${imageName}.png`);
    page.screenshot({ path: imagePath, fullpage: true });
}

module.exports = {
    screenshot,
}