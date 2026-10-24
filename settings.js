/* ========== BACKGROUND SETTINGS ========== */

const bgUpload = document.getElementById("bgUpload");
const bgReset = document.getElementById("bgReset");
const bgPreview = document.getElementById("bgPreview");
const bgPreviewLabel = document.getElementById("bgPreviewLabel");
const bgStatus = document.getElementById("bgStatus");

const STORAGE_KEY = "ugg_background";

function showStatus(msg, isError) {
  bgStatus.textContent = msg;
  bgStatus.style.color = isError ? "#f87171" : "#4ade80";
  if (msg) {
    setTimeout(() => { bgStatus.textContent = ""; }, 4000);
  }
}

function updatePreview(dataUrl) {
  if (dataUrl) {
    bgPreview.style.backgroundImage = `url(${dataUrl})`;
    bgPreviewLabel.textContent = "Custom background";
  } else {
    bgPreview.style.backgroundImage = "";
    bgPreviewLabel.textContent = "Default background";
  }
}

// Load current on page open
(function initPreview() {
  const saved = localStorage.getItem(STORAGE_KEY);
  updatePreview(saved);
  if (typeof applyBackground === "function") applyBackground();
})();

// Upload handler
bgUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showStatus("Please choose an image file (PNG, JPG, etc.)", true);
    return;
  }

  // Limit size ~2MB to avoid localStorage issues
  if (file.size > 2 * 1024 * 1024) {
    showStatus("Image is too large. Please use a file under 2 MB.", true);
    bgUpload.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
      updatePreview(dataUrl);
      if (typeof applyBackground === "function") applyBackground();
      showStatus("Background saved! It will show on all pages.");
    } catch (err) {
      showStatus("Could not save. Image may be too large for storage.", true);
    }
  };
  reader.onerror = () => showStatus("Failed to read the file.", true);
  reader.readAsDataURL(file);
});

// Reset
bgReset.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  updatePreview(null);
  if (typeof applyBackground === "function") applyBackground();
  bgUpload.value = "";
  showStatus("Background reset to default.");
});
