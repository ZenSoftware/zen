FROM node:18-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY dist/package-deploy.json ./package.json
COPY apps/api/schema.prisma ./schema.prisma

RUN npm i --omit=dev --loglevel warn
RUN cp /usr/src/api/node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node ./

# ENV DATABASE_URL=postgresql://user:pass@localhost:5432/database

ENV PORT=7080
ENV SOCKETIO_PORT=7081

EXPOSE 7080/tcp
EXPOSE 7081/tcp

CMD [ "node", "main.js" ]