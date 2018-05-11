let cacheName = "dimonaCache";

let filesToCache = [
  '/',
  '/index.html',
  '/js/controller/initialize.js',
  '/js/model/Board.js',
  '/js/view/constructBoard.js',
  '/js/view/model.js',
  '/js/app.js',
  '/css/style.css',
  '/images/D_Logo.png',
];

console.log(self);

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch',function(e){
  console.log('[ServiceWorker] Fetch',e.request.url);
  e.respondWith(
    caches.match(e.request)
      .then((response)=> response || fetch(e.request))
  )
})
