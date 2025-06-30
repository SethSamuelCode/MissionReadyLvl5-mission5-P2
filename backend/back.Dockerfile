FROM node:lts-alpine 

COPY . /app

WORKDIR /app

RUN npm ci --omit=dev 

ENTRYPOINT [ "npm","run", "start" ]