FROM node:16-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY dist/package-deploy.json ./package.json
# COPY package-lock.json ./
COPY prisma/schema.prisma prisma/schema.prisma

RUN npm i --omit=dev --force --loglevel warn

# ENV DATABASE_URL=postgresql://user:pass@localhost:5432/database

ENV PORT=7080
ENV SOCKETIO_PORT=7081

EXPOSE 7080/tcp
EXPOSE 7081/tcp

CMD [ "node", "main.js" ]