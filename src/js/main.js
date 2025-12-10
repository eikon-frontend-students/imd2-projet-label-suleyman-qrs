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

// Burger Menu
const burgerMenu = () => {
  const burger = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");
  const socialIcons = document.querySelector(".social-icons");
  const body = document.body;

  if (!burger) return;

  burger.addEventListener("click", () => {
    const isActive = burger.classList.toggle("active");
    burger.setAttribute("aria-expanded", isActive);

    if (navLinks) navLinks.classList.toggle("active");
    if (socialIcons) socialIcons.classList.toggle("active");

    // Prevent body scroll when menu is open
    body.style.overflow = isActive ? "hidden" : "";
  });

  // Close menu when clicking on a link
  if (navLinks) {
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("active");
        if (socialIcons) socialIcons.classList.remove("active");
        body.style.overflow = "";
      });
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  videoCarousel();
  burgerMenu();
});
