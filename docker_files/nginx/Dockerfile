FROM nginx
COPY ./conf.d /etc/nginx/conf.d
RUN mkdir /etc/nginx/cert
COPY ./cert /etc/nginx/cert
EXPOSE 80
