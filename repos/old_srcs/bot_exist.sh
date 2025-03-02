#!/bin/bash
WHATSAPP_BOT_DIR=$(pwd)/whatsapp-bot

if [ ! -d "$WHATSAPP_BOT_DIR" ]; then
  echo "folder don't exist process create"
  npx express-generator -f /app/srcs/whatsapp-bot;
else
  echo "folder exist"
fi

echo "cd $WHATSAPP_BOT_DIR"
cd "$WHATSAPP_BOT_DIR"

echo "install dependency"
npm install puppeteer http-error express cookie-parser morgan
npm install --arch=arm64 --platform=linuxmusl sharp

PUPPETEER_VERSION=$(npm list puppeteer)
echo "Version de puppeteer : $PUPPETEER_VERSION"
npm install

echo "starting application with nodemon"
DEBUG=whatsapp-bot:* nodemon --verbose --ignore 'cookies/*' ./bin/www
