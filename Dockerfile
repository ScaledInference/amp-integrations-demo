FROM node:9.4.0

WORKDIR /console

COPY package.json /console

COPY src /console/src

RUN npm install --only=production

CMD npm run app

EXPOSE 5150