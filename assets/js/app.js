let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");
let icon = navToggle.querySelector("i");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    navWrapper.classList.remove("active");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
  } else {
    navWrapper.classList.add("active");

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

    this.setAttribute("aria-expanded", "true");
    this.setAttribute("aria-label", "close menu");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/assets/js/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
});

