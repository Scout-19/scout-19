FROM node:alpine3.10

WORKDIR /app

RUN apk update && \
    yarn global add @vue/cli
