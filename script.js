/* ========== BACKGROUND (shared) ========== */
const BG_KEY = "ugg_background";

function applyBackground() {
  const saved = localStorage.getItem(BG_KEY);
  if (saved) {
    document.body.classList.add("has-custom-bg");
    document.body.style.backgroundImage = `url(${saved})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundRepeat = "no-repeat";
  } else {
    document.body.classList.remove("has-custom-bg");
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundRepeat = "";
  }
}

applyBackground();

/* ========== MOBILE MENU ========== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}
