// Choose a cache name
const cacheName = 'letsplay-v0.0.1';
// List the files to precache
const precacheResources = [
    './', './index.html', 
    './css/style.css', 
    './js/main.js', 
    './js/confetti.browser.min.js', 
    './svg/c4_p.svg',
    './svg/memory_p.svg',
    './svg/tris_p.svg',
    './icons/icon48.png',
    './icons/icon192.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-16x16.png',
    './icons/favicon-32x32.png',
    './icons/safari-pinned-tab.svg',
    './icons/icon512.png'
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});