var CACHE_NAME = 'flux-v4-7-0';
var URLS_TO_CACHE = ['./', './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@400;600;700&display=swap'
];
self.addEventListener('install', function(e) { e.waitUntil(caches.open(CACHE_NAME).then(function(c) { return c.addAll(URLS_TO_CACHE); }).then(function() { return self.skipWaiting(); })); });
self.addEventListener('activate', function(e) { e.waitUntil(caches.keys().then(function(n) { return Promise.all(n.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); })); }).then(function() { return self.clients.claim(); })); });
self.addEventListener('fetch', function(e) { e.respondWith(fetch(e.request).then(function(r) { if (r && r.status === 200) { var c = r.clone(); caches.open(CACHE_NAME).then(function(ca) { ca.put(e.request, c); }); } return r; }).catch(function() { return caches.match(e.request); })); });
