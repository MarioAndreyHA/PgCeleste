self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('cache-v4').then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/contactanos.html",
        "/Oferta_educativa.html",
        "/Ubicacion.html",
        "/plan.html",
        "/estilos.css",
        "/ofertaE.css",
        "/plan.css",
        "/manifest.json",
        "/app.js",
        "/offline.html",
        
        "/imagenes/1.jpg",
        "/imagenes/2.jpg",
        "/imagenes/3.jpg",
        "/imagenes/4.jpg",
        "/imagenes/5.jpg",
        "/imagenes/actitud.png",
        "/imagenes/beca.png",
        "/imagenes/benemerita.png",
        "/imagenes/conocimiento.png",
        "/imagenes/escudo.png",
        "/imagenes/escuelasuperior.png",
        "/imagenes/graduacion.png",
        "/imagenes/icon.png",
        "/imagenes/icono1.png",
        "/imagenes/icono2.png",
        "/imagenes/inicio_cap.png",
        "/imagenes/itson.png",
        "/imagenes/logo_unam.png",
        "/imagenes/mujer-removebg-preview.png",
        "/imagenes/multitalentoso.png",
        "/imagenes/papeleria.png",
        "/imagenes/par_students-removebg-preview.png",
        "/imagenes/plan_cap.png",
        "/imagenes/planeta-tierra.png",
        "/imagenes/profesional.jpg",
        "/imagenes/public-service.png",
        "/imagenes/Software.jpg",
        "/imagenes/tla.jpg",
        "/imagenes/unam.jpg",
        "/imagenes/valor.png"
      ]);
    })
  );
});


self.addEventListener("activate", event => {
  console.log('Service worker Activado');
  const cacheWhitelist = ['cache-v4'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', event => {
  console.log("Service Worker: Fetch", event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/offline.html'))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activado");
  const cacheWhitelist = ["cache-v4"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Borrando caché antigua: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log("Service Worker: Fetch", event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              throw new Error('Error en la respuesta de la red');
            }
            return networkResponse;
          });
      })
      .catch(() => caches.match('/offline.html'))
  );
});

