document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navMenuBtn = document.getElementById("navMenuBtn");
  const navDropdownMenu = document.getElementById("navDropdownMenu");
  
  const sortBtn = document.getElementById("sortButton");
  const sortDropdownMenu = document.getElementById("sortDropdownMenu");
  
  const filterBtn = document.getElementById("filterButton");
  const filterDropdownMenu = document.getElementById("filterDropdownMenu");

  const footerBtn = document.getElementById("footerAccordionBtn");
  const footerContent = document.getElementById("footerContent");

  // Utility function to close all dropdowns
  function closeAllDropdowns() {
    [navDropdownMenu, sortDropdownMenu, filterDropdownMenu].forEach(menu => {
      if (menu) menu.classList.remove("show");
    });
    [navMenuBtn, sortBtn, filterBtn].forEach(btn => {
      if (btn) btn.classList.remove("active");
    });
  }

  // 1. Navigation Dropdown Toggle
  if (navMenuBtn && navDropdownMenu) {
    navMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navDropdownMenu.classList.contains("show");
      closeAllDropdowns();
      if (!isOpen) {
        navDropdownMenu.classList.add("show");
        navMenuBtn.classList.add("active");
      }
    });
  }

  // 2. Sort Dropdown Toggle
  if (sortBtn && sortDropdownMenu) {
    sortBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = sortDropdownMenu.classList.contains("show");
      closeAllDropdowns();
      if (!isOpen) {
        sortDropdownMenu.classList.add("show");
        sortBtn.classList.add("active");
      }
    });

    // Handle Sort Selection
    sortDropdownMenu.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", (e) => {
        const sortValue = parseInt(e.target.getAttribute("data-sort"), 10);
        const sortText = e.target.innerText;
        sortBtn.innerHTML = `Sort: ${sortText} <span class="arrow-icon">▼</span>`;
        closeAllDropdowns();
        
        if (typeof sortPages === "function") {
          sortPages(sortValue);
        }
      });
    });
  }

  // 3. Filter Dropdown Toggle
  if (filterBtn && filterDropdownMenu) {
    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = filterDropdownMenu.classList.contains("show");
      closeAllDropdowns();
      if (!isOpen) {
        filterDropdownMenu.classList.add("show");
        filterBtn.classList.add("active");
      }
    });

    // Handle Filter Selection
    filterDropdownMenu.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", (e) => {
        const filterValue = e.target.getAttribute("data-filter");
        filterBtn.innerHTML = `Filter: ${filterValue} <span class="arrow-icon">▼</span>`;
        closeAllDropdowns();
        
        if (typeof filterPages === "function") {
          filterPages(filterValue);
        }
      });
    });
  }

  // 4. Global Click-Outside Detection to Close Dropdowns
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown-container") && 
        !e.target.closest(".dropdown-wrapper")) {
      closeAllDropdowns();
    }
  });

  // 5. Accordion Footer Toggle
  if (footerBtn && footerContent) {
    footerBtn.addEventListener("click", () => {
      footerBtn.classList.toggle("active");
      if (footerContent.style.maxHeight) {
        footerContent.style.maxHeight = null;
      } else {
        footerContent.style.maxHeight = footerContent.scrollHeight + "px";
      }
    });
  }

  // 6. Initialize External Game Lists
  if (typeof generateNewPageList === "function") generateNewPageList();
  if (typeof generatePageListMULTI === "function") generatePageListMULTI();
  if (typeof generatePageListONLINE === "function") generatePageListONLINE();
});
