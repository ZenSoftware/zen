FROM node:20-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/api/prisma/schema.prisma ./schema.prisma

RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
RUN pnpm i --prod --frozen-lockfile
RUN cp /usr/src/api/node_modules/prisma/libquery_engine-linux-musl.so.node ./

# ENV DATABASE_URL=postgresql://user:pass@localhost:5432/database

ENV PORT=7080
EXPOSE 7080

CMD [ "node", "main.js" ]