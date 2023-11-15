ARG NODE_VERSION=19.9.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/mern/frontend

COPY . .

RUN npm ci

ENV NODE_ENV production

RUN npm run build

FROM nginx:alpine AS serve

WORKDIR /usr/share/nginx/html

RUN chmod -R +rx .
RUN rm -rf ./*

COPY --from=build /usr/src/mern/frontend/dist/ ./
COPY --from=build /usr/src/mern/frontend/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]

EXPOSE 80
