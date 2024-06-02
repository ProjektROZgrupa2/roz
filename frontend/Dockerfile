FROM node:lts-slim

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --save-dev

RUN npm install -g react-scripts@latest

COPY . ./

CMD ["npm", "start"]

