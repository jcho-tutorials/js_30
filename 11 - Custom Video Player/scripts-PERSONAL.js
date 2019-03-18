// Get Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  // Alternative
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
}

// Button icon update
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

// Skip video back and forth
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Range bar updates
function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

// Event Listeners
video.addEventListener("click", togglePlay);
//Listen if the video is paused to change the play / pause button
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

// Listen for data-skip for skip function
skipButtons.forEach(button => button.addEventListener("click", skip));

// Listen for changes in range bar
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

// Listen for video time update
video.addEventListener("timeupdate", handleProgress);

// Listen for click on progress bar
progress.addEventListener("click", scrub);

// Dragging in progress bar
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
// Alternative
// progress.addEventListener('mousemove', () => {
//   if (mousedown) {
//     scrub();
//   }
// });
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);






