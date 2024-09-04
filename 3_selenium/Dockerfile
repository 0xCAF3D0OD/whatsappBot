FROM python:3.9

LABEL authors="dino"

RUN apt-get -y update && apt-get install -y firefox-esr \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz \
    && tar -xvzf geckodriver-v0.33.0-linux64.tar.gz \
    && chmod +x geckodriver \
    && mv geckodriver /usr/local/bin/

WORKDIR /app/srcs

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

ARG NGROK_AUTH_TOKEN
ENV NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}
RUN echo "NGROK_AUTH_TOKEN: $NGROK_AUTH_TOKEN"

RUN pip3 install --upgrade ngrok
RUN ngrok config add-authtoken ${NGROK_AUTH_TOKEN}


#RUN uvicorn twilio_app:app --port 8080
CMD ["bash", "-c", "uvicorn py_app_whatbot:app --reload --port 8080"]
