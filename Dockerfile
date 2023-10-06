FROM node:14 as builder

ENV CI=1
WORKDIR /src/app
COPY ./package.json package-lock.json ./
RUN npm i && npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.24.0-alpine

ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/app/dist /usr/share/nginx/html
#COPY --from=builder /src/app /tmp/src-app
#COPY --from=builder /root /tmp/root