// --- 1. Mobil Menyu (Hamburger) Funksionallığı ---
let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");
let icon = navToggle ? navToggle.querySelector("i") : null;

if (navToggle && navWrapper && icon) {
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
}


// --- 2. Service Worker Qeydiyyatı ---
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


// --- 3. Dropdown Menyusu və Ox İşarəsi ---
const dropdownLink = document.getElementById('dropdownMenuLink');

if (dropdownLink) {
    dropdownLink.addEventListener('click', function () {
        this.classList.toggle('rotate');
    });

    // Səhifədə başqa yerə kliklədikdə dropdown bağlanırsa, ox da düzəlsin
    document.addEventListener('click', function (e) {
        if (!dropdownLink.contains(e.target)) {
            dropdownLink.classList.remove('rotate');
        }
    });
}


// --- 4. Header Skrol Effekti (Aşağı çəkəndə rəng/kölgə gəlməsi) ---
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});