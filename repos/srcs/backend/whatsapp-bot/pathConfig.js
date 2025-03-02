const path = require('path');

const Root = '/';
const Login = 'whatsappLoginPage';

const appDir = path.resolve(path.join(__dirname, '../..'));
const backDir = path.resolve(path.join(__dirname, '..'));
const frontDir = path.resolve(appDir, 'frontend');
const backBotDir = path.resolve(backDir, 'whatsapp-bot');
const backBotPubDir = path.resolve(backBotDir, 'public');

module.exports = {
    Root,
    Login,

    appDir,
    backDir,
    frontDir,
    backBotDir,
    backBotPubDir,

    srcsDir: path.resolve(frontDir, 'src'),
    imageDir: path.resolve(backBotPubDir, 'images'),
}