# FROM baseImage
FROM nginx:alpine

# COPY source dest

COPY . /usr/share/nginx/html

# EXPOSE 
EXPOSE 80