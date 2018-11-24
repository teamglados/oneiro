# docker build --tag oneiro:latest .
FROM python:3.6.7-alpine3.8

MAINTAINER Andreas Urbanski <urbanski.andreas@gmail.com>

COPY ./server /opt/server

RUN set -ex \
  && uname -a \
  && apk add --no-cache --virtual .builddeps \
    alpine-sdk \
  && pip install \
    requests \
    sanic \
  && apk del .builddeps

EXPOSE 8000

CMD ["python", "/opt/server/server.py"]
