# Stage 0, based on Node.js, to build and compile Angular

ARG buildNum=0

FROM node:8-alpine as build

WORKDIR /app

RUN apk update && apk add --no-cache --virtual .build-deps python make g++ build-base

COPY package*.json /app/

COPY node_modules-local /app/node_modules-local

RUN npm install

RUN apk del .build-deps

COPY . /app/

ARG buildNum

RUN node ./node_modules/webpack/bin/webpack.js --config config/webpack.prod.pib-web.js --profile --env.BUILD_NUMBER=$buildNum
RUN node ./cache-busting-script.js $buildNum

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.12.2-alpine

ENV TERM=xterm-256color

RUN rm /etc/nginx/conf.d/default.conf && rm /usr/share/nginx/html/index.html && rm /usr/share/nginx/html/50x.html

COPY --from=build /app/dist/ /usr/share/nginx/html/pibweb
