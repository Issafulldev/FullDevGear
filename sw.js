/* Minimal service worker placeholder.
 * During development this prevents 404 errors from Lighthouse when no build SW is generated.
 * The build pipeline overwrites this file in dist/ with the Workbox-generated service worker.
 */

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Remove the no-op fetch handler to avoid browser warning. Add caching logic here if needed.

