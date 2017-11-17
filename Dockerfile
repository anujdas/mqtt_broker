FROM node:8.9.1-alpine

COPY . /src

WORKDIR /src

RUN yarn install

USER node

CMD [ "node", "index.js" ]
