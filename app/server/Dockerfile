FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]