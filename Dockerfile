FROM openalpr:latest

MAINTAINER Andreas Urbanski <urbanski.andreas@gmail.com>

RUN set -ex \
  && mkdir -p /opt/api

WORKDIR /opt

RUN set -ex \
  && uname -a \
  && apt-get update -y \
  && apt-get install -y \
    wget \
    git \
    python3 \
    python3-pip \
  && ln -s $(which python3) /usr/local/bin/python \
  && ln -s $(which pip3) /usr/local/bin/pip \
  && python --version \
  && pip --version

RUN set -ex \
  && git clone https://github.com/openalpr/openalpr.git \
  && cd ./openalpr/src/bindings/python \
  && python setup.py install \
  && wget http://plates.openalpr.com/h786poj.jpg -O test.jpg \
  && python test.py -c eu test.jpg

RUN set -ex \
  && pip install \
    requests \
    sanic

COPY ./server /opt/api/server

EXPOSE 8000

ENTRYPOINT ["python", "/opt/api/server/server.py"]
