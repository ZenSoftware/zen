FROM node:14-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY package*.json ./
RUN npm ci --production --loglevel warn

COPY node_modules/.prisma/client node_modules/.prisma/client
# ENV DATABASE_URL=postgresql://user:pass@localhost:5432/database

ENV PORT=7080
EXPOSE ${PORT}

CMD [ "node", "main.js" ]