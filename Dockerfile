 # docker镜像
FROM registry-itwork.yonghui.cn/yhsa/nginx-base:1.16

#  **注意** dist 为打包的目录-根据自定义输出目录添加
ADD dist /usr/share/nginx/html

# nginx前端常规配置不用设置
# 需要额外 nginx 的配置可以 添加 到default.conf文件底下
COPY default.conf   /etc/nginx/conf.d/