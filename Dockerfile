# build ===============================
FROM node:10 as build

WORKDIR /ahwanam-consumer-portal

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM node:10-alpine as run

WORKDIR /ahwanam-consumer-portal

COPY --from=build /ahwanam-consumer-portal .

EXPOSE 3000

CMD ["npm", "run", "start-prod"]
