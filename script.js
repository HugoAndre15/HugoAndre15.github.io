// active hamburger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
let overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navlist.classList.toggle("active");
  document.body.classList.toggle("open");
});

// remove navlist when clicking on navigation links
navlist.addEventListener("click", () => {
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
  document.body.classList.remove("open");
});

// remove navlist when clicking on overlay
overlay.addEventListener("click", () => {
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
  document.body.classList.remove("open");
});

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
if (currentTheme === "light") {
  themeIcon.className = "bx bx-sun";
} else {
  themeIcon.className = "bx bx-moon";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  if (newTheme === "light") {
    themeIcon.className = "bx bx-sun";
  } else {
    themeIcon.className = "bx bx-moon";
  }
});

// portfolio filter
var mixer = mixitup(".portfolio-grid", {
  selectors: {
    target: ".portfolio-item",
  },
  animation: {
    duration: 500,
  },
});

// Initialize swiperjs

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

//   skill Progress bar

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
  if (!skillsPlayed) skillsCounter();
});

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;
  skillsPlayed = true;
  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 465 - 465 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

// side progress bar

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#4facfe ${scrollValue}%, rgba(79, 172, 254, 0.2) ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll reveal

ScrollReveal({
  distance: "90px",
  duration: 2000,
  delay: 200,
  // reset: true ,
});

ScrollReveal().reveal(".hero-info,.main-text,.proposal,.heading", {
  origin: "top",
});
ScrollReveal().reveal(".about-img,.fillter-buttons,.contact-info", {
  origin: "left",
});
ScrollReveal().reveal(".about-content,.skills", { origin: "right" });
ScrollReveal().reveal(
  ".allServices,.portfolio-gallery,.blog-box,footer,.img-hero",
  { origin: "bottom" }
);

// Initialize progress bars animation
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observerOptions = {
    threshold: 0.7,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progress = progressBar.dataset.progress;

        setTimeout(() => {
          progressBar.style.width = progress + "%";
          progressBar.style.opacity = "1";
        }, 300);
      }
    });
  }, observerOptions);

  progressBars.forEach((bar) => {
    bar.style.width = "0%";
    bar.style.opacity = "0";
    bar.style.transition = "width 1.5s ease-out, opacity 0.5s ease-out";
    observer.observe(bar);
  });
}

// Enhanced typing animation
function initTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  const texts = [
    "Développeur Full Stack",
    "Étudiant à l'ESGI",
    "Alternant chez Prium Solutions",
    "Passionné de technologie",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  if (typingElement) {
    type();
  }
}

// Floating tech cards animation
function initFloatingCards() {
  const techCards = document.querySelectorAll(".tech-card");

  techCards.forEach((card, index) => {
    // Random initial animation delay
    card.style.animationDelay = `${index * 0.2}s`;

    // Add floating animation
    card.style.animation = `float 3s ease-in-out infinite`;
    card.style.animationDelay = `${index * 0.5}s`;
  });
}

// Enhanced portfolio filtering
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      portfolioItems.forEach((item, index) => {
        if (
          filterValue === "all" ||
          item.classList.contains(filterValue.substring(1))
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize all enhancements when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initProgressBars();
  initTypingAnimation();
  initFloatingCards();
  initPortfolioFilter();
  initSmoothScrolling();
});

// Add floating animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .tech-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 30px var(--shadow-medium);
    }
    
    .portfolio-item {
        transition: all 0.3s ease;
    }
    
    .progress-bar {
        background: var(--gradient-primary);
        height: 4px;
        border-radius: 2px;
        transition: width 1.5s ease-out, opacity 0.5s ease-out;
    }
`;
document.head.appendChild(style);
