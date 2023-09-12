# syntax=docker/dockerfile:1

FROM node:20.5.0

ENV PORT=4002

ENV DATABASE_URL=postgresql://postgres:YYSDb6WCco4B9Y6yM@db.cmwnkgjvtqxavgurjmia.supabase.co:5432/postgres

WORKDIR /app

COPY package.json package-lock.json /app

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]