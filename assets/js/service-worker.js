self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('my-cache').then((cache) => {
          return cache.addAll([
              '/', 
              '/index.html',
              '/assets/css/haqqinda.css',
              '/assets/css/klipler.css',
              '/assets/css/mahnilar.css',
              '/assets/css/musicApp.css',
              '/assets/css/şekiller.css',
              '/assets/css/sosial.css',
              '/assets/css/style.css',
              '/assets/js/app.js',
              '/assets/js/klipler-2.js',
              '/assets/js/klipler-api.js',
              '/assets/js/klipler.js',
              '/assets/js/musicApp.js',
              '/assets/js/three.js',
              '/assets/json/klipler.json',
              '/assets/pages/haqqinda.html',
              '/assets/pages/klipler.html',
              '/assets/pages/şekiller.html',
              '/assets/pages/sosial.html',
              '/assets/mp3/', 
              '/assets/imgs/',
              '/assets/imgs-2/', 
              '/assets/imgs-3/', 
              '/assets/hiss-klips-videos/' 
          ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
      })
  );
});
