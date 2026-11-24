// ===== IndexNow: إبلاغ محركات البحث فور النشر =====
// يُرسل إشعارًا تلقائيًا إلى محركات البحث (Bing, Yandex, Google عبر API)
// عند بناء الموقع، ليُسرّع فهرسة المقالات الجديدة.
//
// ملاحظة: التفعيل يتم من _config.yml عبر:
//   indexnow_key: "ff23a3253b51844954e5d18c140e04f7"
//
//يتطلب البناء متغيرًا بيئة INDEXNOW_KEY، أو يُقرأ المفتاح من _config.yml.

(function () {
  'use strict';

  var meta = document.querySelector('meta[name="indexnow-key"]');
  if (!meta) return;

  var key = meta.getAttribute('content');
  if (!key) return;

  var host = window.location.hostname;
  var urls = [];

  // روابط موجودة في هذه الصفحة
  var links = document.querySelectorAll('a[href]');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].href;
    if (!href || href.indexOf('http') !== 0) continue;
    if (href.indexOf(host) === -1) continue;
    if (urls.indexOf(href) === -1) urls.push(href);
  }

  // رابط الصفحة الحالية
  var current = window.location.href.split('#')[0];
  if (urls.indexOf(current) === -1) urls.push(current);

  if (!urls.length) return;

  var payload = {
    host: host,
    key: key,
    keyLocation: 'https://' + host + '/ff23a3253b51844954e5d18c140e04f7.txt',
    urlList: urls.slice(0, 100)
  };

  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  }).catch(function () {
    // فشل الإرسال لا يؤثر على تجربة الزائر — نتجاهله بهدوء
  });
})();
