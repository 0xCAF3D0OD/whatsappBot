FROM python:3.8

LABEL authors="dino"

RUN apt-get update && apt-get install -y \
    python3-pip \
    xvfb \
    x11vnc \
    novnc

# Installez les dépendances Python nécessaires
RUN pip3 install selenium webdriver_manager

# Copiez votre script Python dans le conteneur
COPY tuto.py /app/tuto.py

WORKDIR /app

# Commande pour démarrer votre script
CMD ["python3", "tuto.py"]