## Test technique Aimene - Kanbios Application de Chat 
C'est un répertoire pour une application de chat en temps réel, construite avec les technologies **React.js** pour le front-end et **Nest.js** pour le back-end. La gestion des utilisateurs est effectuée avec une base de données **PostgreSQL**, tandis que les messages sont stockés dans **MongoDB** pour supporter des échanges rapides et synchronisés en temps réel via  **Socket. io**. 

### 1-Lancement de l’Application
L'application est entièrement conteneurisée avec **Docker**. Le fichier `docker-compose.yml` gère quatre conteneurs : **PostgreSQL**, **MongoDB**, **Front** et le **Back**.

.Avant de démarrer les conteneurs, il est nécessaire de créer un fichier `.env` dans le répertoire du back-end. Ce fichier `.env` est basé sur un modèle, `.env.template`, qui contient déjà toutes les configurations nécessaires. Dans notre cas, il suffit de copier le contenu de `.env.template` dans `.env`.

Démarrez Docker  avec la commande :

    docker-compose up --build
  
 
   L’application sera disponible aux adresses suivantes :
-   **Back-end (Nest.js)** : http://localhost:3000
-   **Front-end (React)** : http://localhost:3001
-   **Documentation Swagger** : http://localhost:3000/api

Pour lancer les tests du back-end, utilisez :

    npm run test
    
Si des problèmes surviennent avec Docker ou si vous préférez lancer directement les services, voici les commandes manuelles :

Front: 

    npm start
Back:

    npm run start:dev


### 2-Fonctionnalités de l'Application

L'application comprend une gestion des utilisateurs avec deux types de rôles : **Admin** et **Utilisateur**.

-   **Admin** : Accès à une interface de gestion des utilisateurs.
-   **Utilisateur** : Accès aux fonctionnalités de chat en temps réel.

#### Routes Front-end

-   `/login` : Page de connexion.
-   `/register` : Page d'inscription.
-   `/` : Page principale du chat, nécessitant une authentification.
-   `/admin` : Interface d'administration (accès réservé aux administrateurs).

Les routes `/` et `/admin` sont protégées et nécessitent une authentification.

### 3-Sécurité : Sessions et Tokens
Le système de gestion de sessions repose sur des tokens d’authentification avec une durée de vie configurable de **30 minutes**. Ce token est géré côté client et serveur, et la durée peut être modifiée dans le fichier `src/auth/auth.module.ts` :

    JwtModule.register({
    
    secret:  '',
    
    signOptions: { expiresIn:  '30m' // ici ... },
    
    }),
### 4-Packages Techniques
### Packages Techniques

#### Packages du Front-end

-   **axios** : Pour les appels HTTP.
-   **tailwind** : Pour le style et la mise en forme.
-   **jwt-decode** : Pour décoder les tokens JWT côté client.
-   **react-hook-form** : Pour la gestion des formulaires de manière simple et réactive.
-   **react-router-dom** : Pour la navigation entre les pages.
-   **react-toastify** : Pour afficher des notifications à l’utilisateur.
-   **socket.io-client** : Pour la communication en temps réel avec le serveur.

#### Packages du Back-end

-   **@nestjs/class-transformer** : Pour transformer et valider les données.
-   **@nestjs/config** : Pour gérer les configurations d’environnement.
-   **@nestjs/jwt** : Pour la gestion des tokens JWT.
-   **@nestjs/mongoose** : Pour intégrer MongoDB.
-   **@nestjs/passport** : Pour la gestion de l’authentification.
-   **@nestjs/platform-socket.io** et **@nestjs/websockets** : Pour implémenter la communication en temps réel avec Socket .io.
-   **@nestjs/swagger** : Pour générer la documentation API Swagger.
-   **@nestjs/typeorm** : Pour intégrer PostgreSQL via TypeORM.
-   **bcrypt** : Pour hacher les mots de passe des utilisateurs.
-   **class-validator** : Pour valider les données des requêtes.
-   **passport-jwt** et **passport-local** : Pour l'authentification via JWT et la stratégie locale.
-   **pg** : Pour la connexion à PostgreSQL.
-   **socket. io** : Pour la communication en temps réel côté serveur.
-   **swagger-ui-express** : Pour exposer Swagger.
-   **typeorm** : Pour gérer les entités et migrations de données.



