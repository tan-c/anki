// precache and workbox-sw.js will be auto cached by webpack plugins
// This is the default that would be created if not using customized file
workbox.skipWaiting();
workbox.clientsClaim();

// *****************************
// This is the customized content

// Cache google font
workbox.routing.registerRoute(
  new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleFontCache',
  }),
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|mov|eot|woff2|ttf|min.js)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'imagesMovieFontMinJS',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:8081|https://api.tanchen.me/'),
  workbox.strategies.networkFirst({
    cacheName: 'apiCache',
  }),
);

self.addEventListener('install', (event) => {
  // toastr.info('Installed!!', 'Service Worker');
  console.log('🔥🔥🔥🔥🔥 SW installed at 🔥🔥🔥🔥🔥', new Date().toLocaleTimeString());
  // self.skipWaiting(); // then you dont need to click on the "Update on reload button"
  // event.waitUntil(caches.open(version).then);
});

self.addEventListener('activate', (event) => {
  console.log('🔥🔥🔥🔥🔥 SW activated at 🔥🔥🔥🔥🔥', new Date().toLocaleTimeString());
});

self.addEventListener('push', (event) => {
  try {
    const payload = event.data.json();

    const {
      title,
      body,
      actions,
      data,
      tag,
    } = payload;

    const options = {
      body: body === 'undefined' ? '🔥🔥 No Body 🔥🔥' : body,
      icon: '/favicons/icon-96x96.png',
      badge: '/favicons/icon-96x96.png',
      requireInteraction: true,
      actions: [],
      data: data === undefined ? '' : data,
    };

    if (tag !== undefined) {
      options.tag = tag;
    }

    actions.forEach((action) => {
      options.actions.push({
        action,
        title: action.charAt(0).toUpperCase() + action.substr(1),
      });
    });
    console.log('🔥🔥🔥🔥🔥 options 🔥🔥🔥🔥🔥');
    console.log(options);
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    console.log('🔥🔥🔥🔥🔥 push err 🔥🔥🔥🔥🔥');
    console.log(err);
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔥🔥🔥🔥🔥 event.action 🔥🔥🔥🔥🔥');
  console.log(event.action);

  event.waitUntil(self.clients.matchAll({
    type: 'window',
  }).then((clientList) => {
    if (clientList.length) {
      if (event.action !== undefined && event.action !== '') {
        const windowClient = clientList[0];
        windowClient.focus();

        const { data } = event.notification;
        let newUrl = `${windowClient.url}?swAction=${event.action}`;
        Object.keys(data).forEach((k) => {
          newUrl += `&${k}=${data[k]}`;
        });

        windowClient.navigate(newUrl).then((WindowClient) => {
          event.notification.close();
        });
      } else {
        event.notification.close();
      }
    } else {
      console.log('🔥🔥🔥🔥 evt.action not defined 🔥🔥🔥🔥');
      self.clients.openWindow('/');
    }
  }));
});

self.addEventListener('notificationclose', (event) => {
  console.log('🔥🔥🔥🔥🔥 notification closed 🔥🔥🔥🔥🔥');
});

// self.addEventListener('fetch', (event) => {
//   // console.log(event.request.url);
//
//   if (!navigator.onLine) { // due to Lie wi online wont work, but checking offline is good
//     console.log('🔥🔥🔥🔥🔥 No Connection 🔥🔥🔥🔥🔥');
//     event.respondWith(new Response('<h1>No Connection<h1>', {
//       headers: {
//         'Content-Type': 'text/html',
//       },
//     }));
//   } else {
//     event.respondWith(fetch(event.request));
//   }
// });

// Important: workbox.precaching.precacheAndRoute(self.__precacheManifest) reads a list of URLs to precache from an externally defined variable, self.__precacheManifest. At build-time, Workbox injects code needed set self.__precacheManifest to the correct list of URLs.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

