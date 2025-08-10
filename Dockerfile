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
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]