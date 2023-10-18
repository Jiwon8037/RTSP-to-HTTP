FROM node:18
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN apt update
RUN apt install -y ffmpeg
CMD ["npm", "start"]
EXPOSE 7777
