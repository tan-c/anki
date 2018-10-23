# Stage 1 Build Using Node
FROM 923942996254.dkr.ecr.ap-northeast-1.amazonaws.com/js-base-image:latest AS build-deps
# FROM js-base-image:latest AS build-deps
LABEL maintainer="tanchen2014@gmail.com"

RUN mkdir -p ./anki
COPY . ./anki
WORKDIR ./anki

RUN npm install --only=production
RUN npm run build

# Stage 2 Using Nginx To Serve
FROM openresty/openresty:alpine

# To make opm work with alpine version of openresty
RUN apk add --no-cache curl perl
RUN opm install knyar/nginx-lua-prometheus

# Nginx dir is different with openresty, confirm with nginx -t
# /usr/local/openresty/nginx/conf/nginx.conf
ARG nginx_dir=/usr/local/openresty
# COPY nginx/conf.d/default.conf $nginx_dir/nginx/conf.d/default.conf
COPY config/nginx.conf $nginx_dir/nginx/conf/nginx.conf

WORKDIR /dist
COPY --from=build-deps /js-base-image/anki/dist /dist
COPY --from=build-deps /js-base-image/anki/resource/ /dist/

EXPOSE 80
EXPOSE 9145
