const CACHE_NAME = "hydrapro-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/privacy.html",
  "/manifest.json",
  "/lv_0_20260122231858.mp4",
  "https://i.ibb.co/0VBBMfrZ/lv-0-20260119011237.png",
  "https://i.ibb.co/r22ZV0kv/lv-0-20260116051448.png",
  "https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
