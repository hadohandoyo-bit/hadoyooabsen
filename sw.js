/* Service worker: halaman scanner cepat dibuka & tetap jalan saat offline. © 2026 Muhammad Azis Effendy */
const V = 'scanner-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;                       // POST ke Apps Script tidak disentuh
  const u = new URL(r.url);
  const isJsQR = /jsqr/i.test(u.pathname);
  if (u.origin !== location.origin && !isJsQR) return;  // hanya cache halaman sendiri + pustaka jsQR
  e.respondWith(
    caches.match(r).then(hit => {
      const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) caches.open(V).then(c => c.put(r, res.clone())); return res; }).catch(() => hit);
      return hit || net;                                // cache dulu, perbarui di belakang
    })
  );
});
