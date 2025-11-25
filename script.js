// Typing Animation
const typingElement = document.querySelector(".typing");
const typingWords = ["Prekshitha", "Information Science Student"];
let wordIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let nextWordDelay = 1200;

function type() {
  if (charIndex < typingWords[wordIndex].length) {
    typingElement.textContent += typingWords[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else setTimeout(erase, nextWordDelay);
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = typingWords[wordIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex = (wordIndex + 1) % typingWords.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500);
  applySavedTheme();
  reveal();
  highlightNav();
});

// Scroll Reveal
window.addEventListener("scroll", reveal);

function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add("active");
  });
  highlightNav();
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
  document.querySelector(".darkmode-btn").textContent = isDark ? "☀️" : "🌙";
}

function applySavedTheme() {
  const saved = localStorage.getItem("dark-mode");
  if (saved === "enabled") {
    document.body.classList.add("dark-mode");
    document.querySelector(".darkmode-btn").textContent = "☀️";
  }
}

// Resume Popup
const resumeBtn = document.querySelector(".resume-btn");
resumeBtn?.addEventListener("click", () => {
  const popup = document.getElementById("resume-popup");
  popup.style.display = "block";
  setTimeout(() => (popup.style.display = "none"), 2000);
});

// Navbar Highlight
const navLinks = document.querySelectorAll(".navbar nav a");

function highlightNav() {
  let fromTop = window.scrollY + 120;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active-link");
    } else link.classList.remove("active-link");
  });
}

// Smooth Scroll
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (!link.hash.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(link.hash);
    window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
  });
});

// ---------------- IMAGE POPUP VIEWER ---------------- //
const popup = document.getElementById("img-popup");
const popupImg = document.getElementById("popup-img");
const closePopup = document.querySelector(".close-popup");

document.querySelectorAll(".project-card img").forEach((img) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    popup.style.display = "block";
    popupImg.src = img.src;
  });
});

closePopup.addEventListener("click", () => (popup.style.display = "none"));
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

console.log("✨ Portfolio Loaded Successfully!");
