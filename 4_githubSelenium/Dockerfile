FROM alpine:3.10

# Installez les dépendances nécessaires
RUN apk add --no-cache git

# Copiez vos fichiers de configuration si nécessaire
COPY .gitconfig /root/.gitconfig

# Définissez le répertoire de travail
WORKDIR /app

# Commande par défaut
CMD ["sh"]

