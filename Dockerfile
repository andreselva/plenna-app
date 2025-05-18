# Imagem oficial do Node.js
FROM node:20-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Build argument para receber a variável
ARG REACT_APP_API_URL

# Define a variável de ambiente para que o processo do build consiga enxergar
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copia o package.json e package-lock.json (se existir) para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Executa o build do projeto
RUN npm run build

# Comando para iniciar o servidor
CMD ["npm", "run", "start:prod"]

EXPOSE 3000
