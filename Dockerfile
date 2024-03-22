FROM node:20

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["sh", "-c", "npm ci && npx nodemon index_01.js"]