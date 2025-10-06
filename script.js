document.addEventListener("DOMContentLoaded", function() {
  // Set active nav link based on current page
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop();
  links.forEach(a => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    }
  });

  // Simple search handler
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const q = searchInput.value.trim();
      if (q) {
        // You can redirect to services page or show a search results page
        window.location.href = "services.html";
      }
    });
  }
});
