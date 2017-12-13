FROM node:8.6.0-alpine

COPY . /src

WORKDIR /src

RUN yarn install

USER node

CMD [ "node", "index.js" ]
