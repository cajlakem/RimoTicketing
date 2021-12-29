#build
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --dev

#Deployment
FROM nginx:alpine
COPY --from=node /app/dist/* /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
