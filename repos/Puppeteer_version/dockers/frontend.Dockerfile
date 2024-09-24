FROM nginx:alpine
LABEL authors="0xCAF3D0OD"

WORKDIR /app/frontend

# Copier les fichiers de dépendances
COPY requirements-front.txt ./

# Installer Node.js, npm et les dépendances système
RUN apk add --no-cache nodejs npm \
    && apk add --no-cache $(cat requirements-front.txt)

# Installer les dépendances npm
RUN npm init -y && npm install && npm install -g bash

RUN npm install -D tailwindcss \
    npx tailwindcss init

# Copier le reste des fichiers de l'application
COPY . .

# Copier la configuration Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]