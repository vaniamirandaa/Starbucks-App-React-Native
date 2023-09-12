# syntax=docker/dockerfile:1

FROM node:20.5.0

ENV PORT=4001

ENV MONGODB=mongodb+srv://vnmrnda:xd6TafZZ9ekZdHW2@cluster0.jezwkes.mongodb.net/?retryWrites=true

WORKDIR /users

COPY package.json package-lock.json /users

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]