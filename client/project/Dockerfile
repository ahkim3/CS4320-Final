FROM node:18

WORKDIR /project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19006

CMD [ "npm" , "run" , "web"]