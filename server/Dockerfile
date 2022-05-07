FROM node:latest as base

WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8080
CMD ["node", "./build/index.js"]