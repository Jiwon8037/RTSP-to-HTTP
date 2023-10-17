const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const cors = require('cors');
dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.get('/streaming', (req, res, next) => {
  const { ip } = req.query;
  const child_process = require('child_process');
  res.header('content-type', 'video/webm');
  const cmd = `ffmpeg -rtsp_transport tcp -i ${process.env.RTSP_URL} -c:v copy -c:a copy -bsf:v h264_mp4toannexb -maxrate 400k -f matroska -`.split(' ');
  const child = child_process.spawn(cmd[0], cmd.splice(1), {
    stdio: ['ignore', 'pipe', process.stderr],
  });
  child.stdio[1].pipe(res);
  res.on('close', () => {
    child.kill();
  });
});

app.use((req, res, next) => {//에러처리파트
  const err = new Error('파일 경로 오류 : 해당 파일을 찾지 못했습니다.');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status == 404) {
  }
  else {
    console.log(err.message)
  }
  res.send(err.message);
});

const port = process.env.PORT;
server.listen(port, () => {//서버 가동  localhost:(port)
  console.log(port + '포트로 서버 실행');
});

process.on('uncaughtException', (err) => {
  console.error('Error! = ', err);
});