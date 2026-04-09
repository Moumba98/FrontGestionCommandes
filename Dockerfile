# Étape 1 : Construction de l'application
FROM node:20-alpine AS build
WORKDIR /app

# On installe les dépendances d'abord 
COPY package*.json ./
RUN npm install

# On copie le reste et on build
COPY . .
RUN npm run build --configuration=production

# Étape 2 : Serveur Nginx pour héberger les fichiers
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# On récupère les fichiers du dossier browser générés à l'étape 1
COPY --from=build /app/dist/front-end-gestion-client/browser /usr/share/nginx/html

# On expose le port 80
EXPOSE 80

# On lance Nginx (TOUJOURS EN DERNIER)
CMD ["nginx", "-g", "daemon off;"]
