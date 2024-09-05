#!/bin/bash

WHATSAPP_BOT_DIR=$(pwd)/whatsapp-bot

if [ ! -f "$WHATSAPP_BOT_DIR"/app.js ] || [ ! -f "$WHATSAPP_BOT_DIR"/routes/bot.js ]; then
  ls -la "$WHATSAPP_BOT_DIR"
  echo "replace content app and add bot.js to routes"
else
  ls -la "$WHATSAPP_BOT_DIR"
  echo "or not"
fi
