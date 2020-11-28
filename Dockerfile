FROM node:14-alpine

COPY . /aggregateMusic/

WORKDIR /aggregateMusic

RUN npm install --production

EXPOSE 7001

CMD ["npm","start"]
