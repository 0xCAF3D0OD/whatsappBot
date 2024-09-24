const path = require('path');

const appDir = path.resolve(path.join(__dirname, '../..'));
const backDir = path.resolve(path.join(__dirname, '..'));
const frontDir = path.resolve(appDir, 'frontend');

module.exports = {
    appDir,
    backDir,
    frontDir,

    srcsDir: path.resolve(frontDir, 'srcs'),
}