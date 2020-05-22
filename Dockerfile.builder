FROM node:buster-slim as builder

WORKDIR /app

RUN apt-get update \
    && apt-get install -y git \
    && npm -g install gatsby-cli

COPY package*.json ./

RUN yarn

COPY . .
RUN mv scripts/* /usr/local/bin \
    && rm -rf scripts \
    && chmod +x /usr/local/bin/* \
    && rm -rf content/*

ONBUILD COPY . /app
ONBUILD RUN builder.sh
