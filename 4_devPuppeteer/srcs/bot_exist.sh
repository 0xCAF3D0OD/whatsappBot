#!/bin/bash
WHATSAPP_BOT_DIR=$(pwd)/whatsapp-bot

if command -v micro >/dev/null 2>&1; then
  echo "Micro is already installed"
  micro --version
else
  echo "installation of micro"
  curl https://getmic.ro | bash && \
  mv micro /usr/bin
  if [ $? -eq 0 ]; then
    echo "Micro is installed"
    micro --version
  else
    echo "micro installation failed"
  fi
fi

if [ ! -d "$WHATSAPP_BOT_DIR" ]; then
  echo "folder don't exist process create"
  npx express-generator -f /app/srcs/whatsapp-bot;
else
  echo "folder exist"
fi

echo "cd $WHATSAPP_BOT_DIR"
cd "$WHATSAPP_BOT_DIR"

if [ ! -f routes/bot.js ]; then
  echo "replace content app and add bot.js to routes"
  cat ../app.js > app.js
  cp ../bot.js routes/
else
  echo "or not"
fi

echo "install dependency"
npm install puppeteer
npm install --arch=arm64 --platform=linuxmusl sharp

PUPPETEER_VERSION=$(npm list puppeteer)
echo "Version de puppeteer : $PUPPETEER_VERSION"
npm install

echo "starting application with nodemon"
DEBUG=whatsapp-bot:* nodemon --verbose ./bin/www
