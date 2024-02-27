FROM node:current-alpine3.17

EXPOSE 3001

WORKDIR /usr/src/app

COPY package.json .
COPY public .
RUN npm install --legacy-peer-deps

RUN chmod -R 777 .
COPY . .

CMD [ "npm", "run", "start" ]