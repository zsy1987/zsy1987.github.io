// Written by Dor Verbin, October 2021
// This is based on: http://thenewcode.com/364/Interactive-Before-and-After-Video-Comparison-in-HTML5-Canvas
// With additional modifications based on: https://jsfiddle.net/7sk5k4gp/13/

function playVids(videoId) {
    var videoMerge = document.getElementById(videoId + "Merge");
    var vid1 = document.getElementById(videoId + "1");
    var vid2 = document.getElementById(videoId + "2");
    var vid3 = document.getElementById(videoId + "3");

    var position1 = 0.33; // 第一个滑块的初始位置
    var position2 = 0.67; // 第二个滑块的初始位置
    var vidWidth = vid1.videoWidth;
    var vidHeight = vid1.videoHeight;

    var mergeContext = videoMerge.getContext("2d");

    if (vid1.readyState > 3 && vid2.readyState > 3 && vid3.readyState > 3) {
        vid1.play();
        vid2.play();
        vid3.play();

        function trackLocation1(e) {
            var bcr = videoMerge.getBoundingClientRect();
            position1 = Math.max(0, Math.min(1, (e.pageX - bcr.x) / bcr.width));
        }
        function trackLocation2(e) {
            var bcr = videoMerge.getBoundingClientRect();
            position2 = Math.max(0, Math.min(1, (e.pageX - bcr.x) / bcr.width));
        }

        videoMerge.addEventListener("mousemove", trackLocation1);
        videoMerge.addEventListener("mouseleave", function() { trackLocation1({ pageX: videoMerge.offsetWidth / 2 }); });
        videoMerge.addEventListener("touchstart", function(e) { trackLocation1({ pageX: e.touches[0].pageX }); });
        videoMerge.addEventListener("touchmove", function(e) { trackLocation2({ pageX: e.touches[0].pageX }); });

        function drawLoop() {
            mergeContext.clearRect(0, 0, videoMerge.width, videoMerge.height);

            // Draw the first video segment
            mergeContext.drawImage(vid1, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth * position1, vidHeight);

            // Draw the second video segment
            mergeContext.drawImage(vid2, 0, 0, vidWidth, vidHeight, vidWidth * position1, 0, vidWidth * (position2 - position1), vidHeight);

            // Draw the third video segment
            mergeContext.drawImage(vid3, 0, 0, vidWidth, vidHeight, vidWidth * position2, 0, vidWidth * (1 - position2), vidHeight);

            // Draw the slider indicators (arrows) for each video segment
            // ...

            requestAnimationFrame(drawLoop);
        }

        requestAnimationFrame(drawLoop);
    }
}

// 你需要为每个视频和滑块添加额外的HTML元素，并确保它们有正确的ID。
// 例如:
// <video id="video1" ... ></video>
// <video id="video2" ... ></video>
// <video id="video3" ... ></video>
// <input type="range" id="slider1" min="0" max="1" value="0.33">
// <input type="range" id="slider2" min="0" max="1" value="0.67">

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
    
    
function resizeAndPlay(element)
{
  var cv = document.getElementById(element.id + "Merge");
  cv.width = element.videoWidth/2;
  cv.height = element.videoHeight;
  element.play();
  element.style.height = "0px";  // Hide video without stopping it
    
  playVids(element.id);
}
