FROM node:12-alpine

ENV CHROMIUM_PATH=/usr/bin/chromium-browser

COPY . /app
WORKDIR /app
RUN apk add --no-cache chromium && \
    npm install --ignore-scripts

ENTRYPOINT ["npm", "start"]
