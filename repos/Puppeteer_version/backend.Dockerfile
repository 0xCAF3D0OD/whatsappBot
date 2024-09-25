FROM node:slim
LABEL authors="0xCAF3D0OD"

WORKDIR /app/backend

COPY dockers/requirements-back.txt .

RUN apt-get -y update && apt-get install -y \
    $(cat requirements-back.txt) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g express-generator nodemon cors

COPY dockers/isBotExisting.sh /app/script/

RUN chmod +x /app/script/isBotExisting.sh

EXPOSE 3000

CMD ["/bin/bash", "-c", "/app/script/isBotExisting.sh"]