# syntax=docker/dockerfile:1

FROM node:20.5.0

ENV PORT=4000

ENV REDIS_PASSWORD=UexISOU2mP1PcrGvYfBEzWviF2s8Fasg

WORKDIR /orchestrator

COPY package.json package-lock.json /orchestrator

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]