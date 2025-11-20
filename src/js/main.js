// Initialize video carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  videoCarousel();
});

// Video Carousel
const videoCarousel = () => {
  // Array of YouTube video IDs
  const videoIds = [
    "bBaIQHi4LVw", // First video
    "bsJpoT53Vhw", // Example second video (replace with your actual video IDs)
    "E1ttU5D8WDs",
    "4rC56HWNUiU", // Example third video (replace with your actual video IDs)
  ];

  let currentIndex = 0;
  const videoFrame = document.querySelector(".video-frame");
  const prevBtn = document.querySelector(".carousel-btn-left");
  const nextBtn = document.querySelector(".carousel-btn-right");

  if (!videoFrame || !prevBtn || !nextBtn) return;

  // Function to update video
  const updateVideo = () => {
    videoFrame.src = `https://www.youtube.com/embed/${videoIds[currentIndex]}`;
  };

  // Previous button click
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    updateVideo();
  });

  // Next button click
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    updateVideo();
  });
};
