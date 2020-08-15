FROM prismagraphql/prisma:1.34

ARG DB_NAME
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG PRISMA_SECRET

ARG PRISMA_CONFIG_PATH
ENV PRISMA_CONFIG_PATH=./packages/server/prisma/prisma.yml

COPY ./packages/server/config.yml ./packages/server/prisma/prisma.yml

# RUN sed -i s/DB_HOST/$DB_HOST/g ./packages/server/prisma/prisma.yml
RUN sed -i s/DB_PASSWORD/$AUTH_DB_PASSWORD/g ./packages/server/prisma/prisma.yml
RUN sed -i s/DB_USER/$DB_USER/g ./packages/server/prisma/prisma.yml
RUN sed -i s/PRISMA_SECRET/$PRISMA_SECRET/g ./packages/server/prisma/prisma.yml
RUN sed -i s/DB_NAME/$DB_NAME/g ./packages/server/prisma/prisma.yml

EXPOSE 4466