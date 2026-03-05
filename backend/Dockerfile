FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# 'start:dev' uses ts-node-dev or nest watch mode
CMD ["npm", "run", "start:dev"]