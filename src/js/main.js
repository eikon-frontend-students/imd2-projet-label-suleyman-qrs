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

// Shape Playground (CodePen-inspired)
const shapePlayground = () => {
  const playground = document.querySelector(".shape-playground");
  if (!playground) return;

  const shapes = playground.querySelectorAll(".shape");
  const cursor = playground.querySelector(".cursor");
  const textArea = playground.querySelector(".shape-playground__content");
  const audio = playground.querySelector(".shape-playground__audio");
  if (!shapes.length || !cursor) return;

  if (audio) {
    audio.loop = true;
  }

  let targetX = 0;
  let targetY = 0;
  let cursorX = 0;
  let cursorY = 0;
  const shapeStates = [...shapes].map(() => ({ x: 0, y: 0 }));
  let playgroundRect = playground.getBoundingClientRect();

  const setTarget = (x, y) => {
    targetX = x;
    targetY = y;
  };

  const centerPositions = () => {
    playgroundRect = playground.getBoundingClientRect();
    setTarget(playgroundRect.width / 2, playgroundRect.height / 2);
  };

  window.addEventListener("resize", centerPositions);

  const animate = () => {
    cursorX += (targetX - cursorX) * 0.18;
    cursorY += (targetY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    shapes.forEach((shape, index) => {
      const state = shapeStates[index];
      const ease = 0.12 - index * 0.02; // slight lag per layer
      state.x += (targetX - state.x) * ease;
      state.y += (targetY - state.y) * ease;
      shape.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
    });

    requestAnimationFrame(animate);
  };

  centerPositions();
  requestAnimationFrame(animate);

  playground.addEventListener("pointermove", (evt) => {
    const rect = playground.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    setTarget(x, y);
  });

  playground.addEventListener("pointerleave", centerPositions);

  if (textArea && audio) {
    const startAudio = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    // Pointerenter is not always treated as a user gesture for audio;
    // also listen for clicks/taps to reliably start playback.
    textArea.addEventListener("pointerenter", startAudio);
    textArea.addEventListener("pointerdown", startAudio);
    textArea.addEventListener("click", startAudio);
    textArea.addEventListener("touchstart", startAudio, { passive: true });
    textArea.addEventListener("pointerleave", stopAudio);
    textArea.addEventListener("focusin", startAudio);
    textArea.addEventListener("focusout", stopAudio);
  }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  videoCarousel();
  burgerMenu();
  shapePlayground();
  normalizeNavLinks();
});

// Normalize nav links so they always point to the site root (prevents nested paths like /artists/artists)
const normalizeNavLinks = () => {
  const nav = document.querySelector(".top-nav");
  if (!nav) return;

  const path = window.location.pathname;
  // If we're in /.../artists/, strip that segment to get the site root; otherwise use current directory
  const base =
    path.includes("/artists/")
      ? path.split("/artists/")[0] + "/"
      : path.replace(/[^/]*$/, "");

  const logo = nav.querySelector(".nav-logo a");
  if (logo) logo.href = `${base}index.html`;

  const links = nav.querySelectorAll(".nav-links a");
  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href.includes("#upcoming")) a.href = `${base}index.html#upcoming`;
    else if (href.includes("#merch")) a.href = `${base}index.html#merch`;
    else if (href.includes("#tours")) a.href = `${base}index.html#tours`;
    else if (href.includes("#contact")) a.href = `${base}index.html#contact`;
    else if (href.includes("artists/index")) a.href = `${base}artists/index.html`;
  });
};
