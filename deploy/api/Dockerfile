FROM node:14-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY package*.json ./
RUN npm ci --production --loglevel warn

ENV PORT=7080
EXPOSE ${PORT}

CMD [ "node", "main.js" ]