/* Minimal service worker for offline caching of app shell */
const CACHE_NAME = 'gpt-golf-shell-v1'
const ASSETS = ['/','/styles/globals.css','/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  )
})
