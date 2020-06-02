FROM node:buster-slim as builder

WORKDIR /app

RUN apt-get update \
    && apt-get install -y git \
    && npm -g install gatsby-cli

COPY package*.json ./

RUN yarn

COPY . .

RUN npm run build


FROM gatsbyjs/gatsby:latest
COPY --from=builder /app/public /pub
