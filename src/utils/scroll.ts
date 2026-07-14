/**
 * Smooth-scrolls to an element by id. Used instead of `<a href="#id">` anywhere
 * HashRouter is in play — under HashRouter the URL hash IS the route, so a plain
 * `#id` anchor gets interpreted as "navigate to route /id" instead of "scroll to
 * this section", which breaks the whole page when no such route exists.
 */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
