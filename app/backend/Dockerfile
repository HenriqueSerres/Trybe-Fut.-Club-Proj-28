FROM node:16-alpine

WORKDIR /app-backend

COPY package.json ./

COPY packages.npm ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
