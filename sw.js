// عالم تقني — Service Worker
// يخزّن الملفات الثابتة محلياً لتسريع التحميل وتحسين تجربة المستخدم

const CACHE_NAME = '3alam-tech-v4';
const STATIC_ASSETS = [
  '/',
  '/shuroohat/',
  '/tawabeek/',
  '/about/',
  '/taizphone.html',
  '/assets/css/style.css',
  '/assets/css/taizphone.css',
  '/assets/js/main.js',
  '/assets/js/search.js',
  '/manifest.json',
  '/feed.xml',
  '/sitemap.xml'
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// تنظيف الذاكرة المؤقتة القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية: الشبكة أولاً للصفحات، الذاكرة المؤقتة أولاً للأصول الثابتة
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // تجاهل الطلبات غير GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // تخطّي الطلبات الخارجية (Google Fonts, CDN)
  if (url.origin !== self.location.origin) return;

  // للأصول الثابتة (CSS, JS): الذاكرة أولاً مع تحديث فوري في الخلفية (stale-while-revalidate)
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request).then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // للصفحات: الشبكة أولاً، ثم الذاكرة المؤقتة كنسخة احتياطية
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }
});
