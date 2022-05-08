FROM node:latest as base

WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
RUN npm run build
COPY . .
EXPOSE 8080
CMD ["node", "./build/index.js"]