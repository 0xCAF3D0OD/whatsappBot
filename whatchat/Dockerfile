FROM python:3.9

LABEL authors="dino"

WORKDIR /app/srcs

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

ARG NGROK_AUTH_TOKEN
ENV NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}
RUN echo "NGROK_AUTH_TOKEN: $NGROK_AUTH_TOKEN"

RUN pip3 install --upgrade ngrok
RUN ngrok config add-authtoken ${NGROK_AUTH_TOKEN}


#RUN uvicorn twilio_app:app --port 8080
CMD ["bash", "-c", "uvicorn py_app:app --reload --port 8080"]
