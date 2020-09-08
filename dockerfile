FROM node:12.18-alpine

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]