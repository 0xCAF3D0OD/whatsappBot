#!/bin/bash

WHATSAPP_BOT_DIR=$(pwd)/whatsapp-bot

if [ ! -d "$WHATSAPP_BOT_DIR" ]; then
  echo "Creating WhatsApp bot folder..."
  npx express-generator -f "$WHATSAPP_BOT_DIR"
fi

cd "$WHATSAPP_BOT_DIR" || exit

echo "Installing dependencies..."
npm install puppeteer http-errors express cookie-parser morgan
npm install --arch=arm64 --platform=linuxmusl sharp

echo "Starting application..."
# shellcheck disable=SC2125
DEBUG=whatsapp-bot:* npx nodemon --ignore 'cookies/*' ./bin/www