# Dockerfile for HTML reload server
FROM node:10.15.1-alpine

LABEL maintainer="Black Eye Technology"

USER node
WORKDIR /home/node
COPY package.json .

RUN set -e && \
    mkdir html && \
    npm install --production

COPY . ./

ENV RELOAD_HOST=localhost
ENV RELOAD_PORT=35729

EXPOSE 8000 35729
VOLUME html

CMD ["npm", "start"]
