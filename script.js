/* ========== GAME DATA ========== */
const games = [
  { id: 1,  title: "Basketball Stars",  cat: "sports",  emoji: "🏀" },
  { id: 2,  title: "Retro Bowl",        cat: "sports",  emoji: "🏈" },
  { id: 3,  title: "Soccer Skills",     cat: "sports",  emoji: "⚽" },
  { id: 4,  title: "Drift Boss",        cat: "racing",  emoji: "🏎️" },
  { id: 5,  title: "Tunnel Rush",       cat: "racing",  emoji: "🚀" },
  { id: 6,  title: "Moto X3M",          cat: "racing",  emoji: "🏍️" },
  { id: 7,  title: "2048",              cat: "puzzle",  emoji: "🧩" },
  { id: 8,  title: "Wordle",            cat: "puzzle",  emoji: "🔤" },
  { id: 9,  title: "Sudoku",            cat: "puzzle",  emoji: "🔢" },
  { id: 10, title: "1v1.LOL",           cat: "action",  emoji: "🔫" },
  { id: 11, title: "Shell Shockers",    cat: "action",  emoji: "🥚" },
  { id: 12, title: "Krunker",           cat: "action",  emoji: "🎯" },
  { id: 13, title: "Slope",             cat: "arcade",  emoji: "🏃" },
  { id: 14, title: "Stack",             cat: "arcade",  emoji: "📦" },
  { id: 15, title: "Crossy Road",       cat: "arcade",  emoji: "🐔" },
  { id: 16, title: "Agar.io",           cat: "io",      emoji: "🟢" },
  { id: 17, title: "Slither.io",        cat: "io",      emoji: "🐍" },
  { id: 18, title: "Diep.io",           cat: "io",      emoji: "🔵" },
];

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

// Apply on every page load
applyBackground();

/* ========== STATE ========== */
let currentCat = "all";
let searchQuery = "";

/* ========== DOM (may be null on settings page) ========== */
const gamesGrid    = document.getElementById("gamesGrid");
const searchInput  = document.getElementById("searchInput");
const searchBtn    = document.getElementById("searchBtn");
const emptyState   = document.getElementById("emptyState");
const sectionTitle = document.getElementById("sectionTitle");
const gameCount    = document.getElementById("gameCount");
const catButtons   = document.querySelectorAll(".cat-btn");
const hamburger    = document.getElementById("hamburger");
const navLinks     = document.getElementById("navLinks");
const gameModal    = document.getElementById("gameModal");
const modalTitle   = document.getElementById("modalTitle");
const modalClose   = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

/* ========== RENDER (home only) ========== */
function renderGames() {
  if (!gamesGrid) return;

  const filtered = games.filter(g => {
    const matchCat = currentCat === "all" || g.cat === currentCat;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const titles = {
    all: "All Games",
    sports: "Sports",
    racing: "Racing",
    puzzle: "Puzzle",
    action: "Action",
    arcade: "Arcade",
    io: ".IO Games"
  };
  if (sectionTitle) sectionTitle.textContent = titles[currentCat] || "Games";
  if (gameCount) gameCount.textContent = filtered.length + (filtered.length === 1 ? " game" : " games");

  gamesGrid.innerHTML = "";

  if (filtered.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }
  if (emptyState) emptyState.hidden = true;

  filtered.forEach((game, i) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.style.animationDelay = (i * 0.03) + "s";
    card.innerHTML = `
      <div class="game-thumb">${game.emoji}</div>
      <div class="game-info">
        <div class="game-title">${game.title}</div>
        <div class="game-tag">${game.cat}</div>
      </div>
    `;
    card.addEventListener("click", () => openGame(game));
    gamesGrid.appendChild(card);
  });
}

function openGame(game) {
  if (!gameModal || !modalTitle) return;
  modalTitle.textContent = game.title;
  gameModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!gameModal) return;
  gameModal.hidden = true;
  document.body.style.overflow = "";
}

/* ========== EVENT LISTENERS ========== */

// Category filter
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderGames();
  });
});

// Search
if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    renderGames();
  });
}
if (searchBtn) {
  searchBtn.addEventListener("click", () => searchInput && searchInput.focus());
}

// Mobile menu
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// Modal
if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && gameModal && !gameModal.hidden) closeModal();
});

/* ========== INIT ========== */
renderGames();
