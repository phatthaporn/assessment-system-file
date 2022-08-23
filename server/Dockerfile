FROM node:14.19.3-alpine


ENV NODE_ENV=production
# ENV PORT=4000

COPY . /app
WORKDIR /app

RUN npm install

# EXPOSE $PORT
ENTRYPOINT ["npm", "start"]