const path = require('path');

const rootDir = path.resolve(__dirname);
const publicDir = path.resolve(rootDir, 'public');
module.exports = {
    rootDir,
    publicDir,
    cookiesDir : path.resolve(rootDir, 'cookies'),
    imageDir: path.resolve(publicDir, 'images'),
    pagesDir: path.resolve(publicDir, 'pages'),
};