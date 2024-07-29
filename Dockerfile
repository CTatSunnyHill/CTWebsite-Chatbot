FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 3001

EXPOSE $PORT

CMD [ "npm", "run", "backend" ]

