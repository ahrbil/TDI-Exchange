FROM prismagraphql/prisma:1.34

ARG DB_NAME
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG PRISMA_SECRET
ARG PRISMA_CONFIG_PATH

COPY ./packages/server/config.yml ./packages/server/prisma/prisma.yml

ENV PRISMA_CONFIG_PATH=./packages/server/config.yml



EXPOSE 4466