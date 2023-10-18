## Rtsp -> Http

rtsp -> http 변환 서버

ffmpeg 설치 필요.  
리눅스 환경 필요.

---
html
```html
<video id="cctv-video" controls autoplay loop width="640" height="400">
  <source type="video/webm" />
</video>
```
js
```js
const video = document.getElementById('cctv-video');
video.src = your video url;
```
