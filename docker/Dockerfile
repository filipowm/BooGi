FROM node:buster-slim as builder

WORKDIR /app

RUN apt-get update \
    && apt-get install --no-install-recommends -y git=1:2.20.1-2+deb10u3 \
    && npm -g install gatsby-cli

COPY package*.json ./

RUN yarn

COPY . .

RUN npm run build


FROM gatsbyjs/gatsby:latest
COPY --from=builder /app/public /pub
