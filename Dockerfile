# On utilise l'image légère de Nginx
FROM nginx:alpine

# On supprime la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# On copie les fichiers compilés d'Angular
# Note: Vérifie bien que le chemin dist/... correspond exactement à ton dossier de build


COPY dist/front-end-gestion-client/browser/. /usr/share/nginx/html


# --- LA MODIFICATION EST ICI ---
# On copie ta config personnalisée AVANT de lancer le serveur


# On expose le port 80
EXPOSE 80

# On lance Nginx (TOUJOURS EN DERNIER)
CMD ["nginx", "-g", "daemon off;"]
