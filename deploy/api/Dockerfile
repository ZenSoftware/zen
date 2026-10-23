FROM node:24-alpine

WORKDIR /usr/src/api

COPY dist/apps/api ./
COPY apps/api/prisma/schema.prisma ./schema.prisma

COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
RUN ln -s /opt/pnpm/pnpm /usr/local/bin/pnpm
RUN pnpm i --prod --frozen-lockfile
RUN cp /usr/src/api/node_modules/prisma/libquery_engine-linux-musl.so.node ./

# ENV DATABASE_URL=postgresql://user:pass@localhost:5432/database

ENV PORT=7080
EXPOSE 7080

CMD [ "node", "main.js" ]