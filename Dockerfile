# Imagem oficial do Node.js
FROM node:20-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json (se existir) para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copia o restante do código para o contêiner
COPY . .

# Executa o build do projeto
RUN npm run build

# Comando para iniciar o servidor
CMD ["npm", "run", "start:prod"]

EXPOSE 3000
