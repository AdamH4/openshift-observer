FROM mhart/alpine-node:latest

RUN mkdir app/
WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .
EXPOSE 8080
# RUN npm run migrate
# RUN npm run seed

