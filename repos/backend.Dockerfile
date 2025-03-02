FROM node:slim
LABEL authors="0xCAF3D0OD"

WORKDIR /app/backend

COPY dockers/requirements-back.txt .

RUN apt-get -y update && apt-get install -y \
    $(cat requirements-back.txt) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the Chrome repo.
RUN wget -O- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor | tee /etc/apt/keyrings/google-chrome.gpg > /dev/null \
    && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list > /dev/null

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable && \
     apt-get clean && rm -rf /var/lib/apt/lists/*

RUN npm install -g express-generator nodemon cors

COPY dockers/isBotExisting.sh /app/script/

RUN chmod +x /app/script/isBotExisting.sh

EXPOSE 3000

CMD ["/bin/bash", "-c", "/app/script/isBotExisting.sh"]