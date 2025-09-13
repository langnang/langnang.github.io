# 使用Nginx基础镜像
FROM nginx:alpine

# 将当前目录的内容复制到Nginx默认的html目录
COPY . /usr/share/nginx/html

# 暴露端口80
EXPOSE 80