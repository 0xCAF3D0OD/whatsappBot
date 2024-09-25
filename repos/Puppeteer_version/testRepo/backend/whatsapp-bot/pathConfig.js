const path = require('path');

const appDir = path.resolve(path.join(__dirname, '../..'));
const backDir = path.resolve(path.join(__dirname, '..'));
const frontDir = path.resolve(appDir, 'frontend');
const backBotDir = path.resolve(frontDir, 'whatsapp-bot');
const backBotPubDir = path.resolve(backBotDir, 'public');

module.exports = {
    appDir,
    backDir,
    frontDir,
    backBotDir,
    backBotPubDir,

    srcsDir: path.resolve(frontDir, 'src'),
    imageDir: path.resolve(backBotPubDir, 'images'),
}