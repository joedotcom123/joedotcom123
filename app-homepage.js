const closedFrames = [
    "Media/Closed1.png",
    "Media/Closed2.png",
    "Media/Closed3.png",
    "Media/Closed4.png",
    "Media/Closed5.png",
    "Media/Closed6.png",
];

const openingFrames = [
    "Media/Opening1.png",
    "Media/Opening2.png",
    "Media/Opening3.png",
    "Media/Opening4.png",
];

const openFrames = [
    "Media/Opened1.png",
    "Media/Opened2.png",
    "Media/Opened3.png",
    "Media/Opened4.png",
    "Media/Opened5.png",
    "Media/Opened6.png"
];

document.querySelectorAll(".door-container").forEach((doorStack, index) => {
    const doorImg = doorStack.querySelector(".door-image");
    let frameIndex = 0;
    let interval = null;
    let mode = "idle";

    function clearAnim() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

  function loopFrames(frames, speed = 100, onEnd = null) {
      clearAnim();
      frameIndex = 0;
      interval = setInterval(() => {
          doorImg.src = frames[frameIndex];
          frameIndex++;
          if (frameIndex >= frames.length) {
              frameIndex = 0;
              if (onEnd) {
                  clearAnim();
                  onEnd();
              }
          }
      }, speed);
  }

  function playFramesOnce(frames, speed = 100, onEnd = null) {
      clearAnim();
      frameIndex = 0;
      interval = setInterval(() => {
          doorImg.src = frames[frameIndex];
          frameIndex++;
          if (frameIndex >= frames.length) {
              clearAnim();
              if (onEnd) {
                  onEnd();
              }
          }
      }, speed);
  }

  function playFramesBackward(frames, startIndex, speed = 100, onEnd = null) {
      clearAnim();
      frameIndex = startIndex;
      interval = setInterval(() => {
          doorImg.src = frames[frameIndex];
          frameIndex--;
          if (frameIndex < 0) {
              clearAnim();
              if (onEnd) {
                  onEnd();
              }
          }
      }, speed);
  }

  function startIdleLoop(startAt = 0) {
      mode = "idle";
      frameIndex = startAt;
      clearAnim();
      interval = setInterval(() => {
          doorImg.src = closedFrames[frameIndex];
          frameIndex = (frameIndex + 1) % closedFrames.length;
      }, 100);
  }

  function startOpenLoop() {
      mode = "open";
      loopFrames(openFrames);
  }

  const randomStart = Math.floor(Math.random() * closedFrames.length);
  startIdleLoop(randomStart);

  doorStack.addEventListener("mouseenter", () => {
      if (mode === "idle" || mode === "closing") {
          mode = "opening";
          playFramesOnce(openingFrames, 100, () => {
              startOpenLoop();
          });
      }
  });

  doorStack.addEventListener("mouseleave", () => {
      if (mode === "opening") {
          mode = "closing";
          const startFrame = frameIndex > 0 ? Math.min(frameIndex - 1, openingFrames.length - 1) : 0;
          playFramesBackward(openingFrames, startFrame, 100, startIdleLoop);
      } else if (mode === "open") {
          mode = "closing";
          playFramesBackward(openingFrames, openingFrames.length - 1, 100, startIdleLoop);
      }
  });
});

const experienceImages = document.querySelectorAll(".background-image");
const experienceFrames = [
    "Media/Block1.png",
    "Media/Block2.png",
    "Media/Block3.png",
    "Media/Block4.png",
    "Media/Block5.png",
    "Media/Block6.png"
];

experienceImages.forEach((img, index) => {
    let frameIndex = Math.floor(Math.random() * 6);
    setInterval(() => {
        frameIndex = (frameIndex + 1) % experienceFrames.length;
        img.src = experienceFrames[frameIndex];
    }, 100);
});
