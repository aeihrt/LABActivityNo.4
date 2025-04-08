// Audio

const audioKey = 'audioTime';
const audioSrc = 'audio/LE SSERAFIM (르세라핌) \'Perfect Night\' (Color Coded Lyrics).mp3';

if (!window.persistedAudio) {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.autoplay = true;
    window.persistedAudio = audio;

    const savedTime = sessionStorage.getItem(audioKey);
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play();

    audio.addEventListener('timeupdate', () => {
        sessionStorage.setItem(audioKey, audio.currentTime);
    });
} else {
    window.persistedAudio.play();
}

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(audioKey, window.persistedAudio.currentTime);
}); 

let slideIndex = 0;
showSlides();

// Next-previous control
function nextSlide() {
  slideIndex++;
  showSlides();
  timer = _timer; // reset timer
}

function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

function showSlides() {
  let slides = document.querySelectorAll(".my-images");
  let dots = document.querySelectorAll(".dots");

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  
  // hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  
  // show one slide base on index number
  slides[slideIndex].style.display = "block";
  
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  
  dots[slideIndex].classList.add("active");
}

// autoplay slides --------
let timer = 7; // sec
const _timer = timer;

// this function runs every 1 second
setInterval(() => {
  timer--;

  if (timer < 1) {
    nextSlide();
    timer = _timer; // reset timer
  }
}, 1000); // 1sec
