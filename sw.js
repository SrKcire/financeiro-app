// Service worker do app instalável: guarda só a "casca" (esta página, manifesto e ícones) pra ela
// abrir rápido e mostrar a mensagem de "sem conexão". Os dados e o sistema vêm sempre do Apps
// Script, pela rede — nada do Financeiro fica guardado aqui.
var CACHE = 'financeiro-casca-v1';
var ARQUIVOS = [
  './', './index.html', './manifest.webmanifest',
  './icones/icone-192.png', './icones/icone-512.png', './icones/apple-touch-icon.png',
  './icones/favicon-32.png', './icones/favicon-16.png'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (nomes) {
    return Promise.all(nomes.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

// Rede primeiro (pra pegar mudanças da casca); se estiver sem internet, usa o que guardou.
// Só mexe em arquivos desta própria página — o Apps Script (outro domínio) passa direto.
self.addEventListener('fetch', function (ev) {
  if (ev.request.method !== 'GET' || new URL(ev.request.url).origin !== self.location.origin) return;
  ev.respondWith(fetch(ev.request).then(function (resp) {
    var copia = resp.clone();
    caches.open(CACHE).then(function (c) { c.put(ev.request, copia); });
    return resp;
  }).catch(function () {
    return caches.match(ev.request).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
