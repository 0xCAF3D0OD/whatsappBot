FROM node:slim

ARG DEBIAN_FRONTEND
#ARG NGROK_AUTH_TOKEN

ENV DEBIAN_FRONTEND=${DEBIAN_FRONTEND}
#ENV NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}

RUN echo "NGROK_AUTH_TOKEN: $NGROK_AUTH_TOKEN"

WORKDIR /app

COPY ./requirements.txt .

RUN apt-get update && \
    apt-get install -y $(cat requirements.txt) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

WORKDIR /app/srcs

RUN npm install -g express-generator nodemon

COPY ./srcs/bot_exist.sh /app/script/

RUN chmod +x /app/script/bot_exist.sh

CMD ["/bin/bash", "-c", "/app/script/bot_exist.sh"]
