/*
 * Inline demo images.
 *
 * Lessons reference friendly names (`photos/cat.jpg`); the runner swaps them for
 * these data URIs before rendering, so previews work with no network at all.
 */

function placeholder(width, height, background, label) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>` +
    `<rect width='100%' height='100%' fill='%23${background}'/>` +
    `<text x='50%' y='50%' font-family='system-ui, sans-serif' font-size='${Math.round(height / 7)}'` +
    ` fill='%23ffffff' text-anchor='middle' dominant-baseline='middle'>${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${svg.replace(/#/g, '%23').replace(/"/g, "'")}`;
}

export const DEMO_IMAGES = {
  'photos/cat.jpg': placeholder(320, 220, '6ea8fe', 'кот'),
  'photos/city.jpg': placeholder(480, 260, '7c5cff', 'город'),
  'photos/mountain.jpg': placeholder(480, 260, '34d399', 'горы'),
  'photos/portrait.jpg': placeholder(200, 200, 'fb7185', 'портрет'),
  'photos/wide.jpg': placeholder(960, 320, '0ea5e9', 'панорама'),
  'photos/small.jpg': placeholder(160, 120, 'f59e0b', 'превью'),
  'images/logo.svg': placeholder(120, 40, '111827', 'LOGO')
};
