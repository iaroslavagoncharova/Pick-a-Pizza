var cacheName = 'pick-a-pizza';
var filesToCache = [
  '/',
  './admin-profile/admin-profile.html',
  './admin-profile/admin-profile.js',
  './admin-profile/admin-profile.css',
  './mainpage/mainpage.html',
  './mainpage/mainpage.css',
  './mainpage/main.js',
  './map/map.html',
  './map/map.js',
  './map/map.css',
  './membership-page/member.html',
  './membership-page/member.js',
  './membership-page/member.css',
  './profile/profile.html',
  './profile/profile.js',
  './profile/profile.css',
  './work/work.html',
  './work/work.js',
  './work/work.css',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});