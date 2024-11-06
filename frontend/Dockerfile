# Utilise une image Node.js de base pour le développement de l'application React
FROM node:18

# Dossier de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du projet
COPY . .

# Expose le port de l'application React
EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]

