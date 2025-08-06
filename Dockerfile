# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .env.production .env.production
COPY . .
RUN npm run build

# Stage 2: Produção com Nginx
FROM nginx:1.25-alpine
# Copia os arquivos da pasta build para a pasta padrão do Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copia nossa configuração customizada
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# Expõe a porta 80, a Railway vai gerenciar
EXPOSE 80
# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]