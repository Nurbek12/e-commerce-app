FROM node:21-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/main.js"]