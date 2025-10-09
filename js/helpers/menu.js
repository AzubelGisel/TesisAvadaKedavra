document.addEventListener("click", function(event) {
    const navbar = document.getElementById("navCollapse");
    const isOpen = navbar.classList.contains("show");
    const isClickInside = navbar.contains(event.target);
    const isToggler = event.target.closest(".navbar-toggler");

    if (isOpen && !isClickInside && !isToggler) {
      const bsCollapse = new bootstrap.Collapse(navbar, { toggle: true });
      bsCollapse.hide();
    }
  });