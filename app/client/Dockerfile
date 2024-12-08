FROM node:20-slim AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-slim

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=builder /usr/src/app/dist /usr/src/app

EXPOSE 80

CMD ["serve", "-s", "/usr/src/app", "-l", "80"]
