FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
