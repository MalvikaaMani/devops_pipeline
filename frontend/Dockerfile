# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# optional nginx setup if serving static build
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

CMD ["npm", "start"]
