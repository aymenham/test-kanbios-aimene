# Utilise une image Node.js de base
FROM node:18

# Crée et définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie tout le reste du projet
COPY . .

# Expose le port sur lequel le backend écoute
EXPOSE 3000

# Démarre l'application en mode développement
CMD ["npm", "run", "start:dev"]
