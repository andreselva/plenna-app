# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copia package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala dependências (prod + dev) para build funcionar
RUN npm install

# Copia o arquivo de ambiente para o build usar
COPY .env.production .env.production

# Copia o resto do código
COPY . .

# Executa o build (compila React+TS)
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia o arquivo de ambiente para runtime, se necessário
COPY --from=build /usr/src/app/.env.production .env.production

# Define a variável de ambiente para rodar em produção
ENV NODE_ENV=production

# Copia o arquivo de configuração do serve para a raiz do app no contêiner
COPY serve.json ./

# Copia o build final da etapa de build
COPY --from=build /usr/src/app/build ./build

# Instala o serve para rodar o app
RUN npm install -g serve

RUN echo "### Listando arquivos na raiz do app:" && ls -la
RUN echo "### Listando arquivos dentro da pasta build:" && ls -la build

CMD ["serve", "-s", "build"]

EXPOSE 3000