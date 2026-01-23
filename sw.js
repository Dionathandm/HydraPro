const CACHE_NAME = "hydrapro-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://i.ibb.co/0VBBMfrZ/lv-0-20260119011237.png",
  "https://i.ibb.co/r22ZV0kv/lv-0-20260116051448.png",
  "https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png"
];

// Instala e adiciona ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativa o Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Intercepta requisições e entrega do cache quando offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
