FROM nginx:alpine

LABEL authors="0xCAF3D0OD"

COPY dockers/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]