// Shared namespace for the classic-script build. Must load before every other module.
window.Atlas = window.Atlas || {};
Atlas.data = Atlas.data || {};

// Absolute URL of the atlas root, derived from this script's own location so pages
// work at any depth (/attention/, /attention/reader.html, ...) without hardcoding
// "../" prefixes. Falls back to the document base when the script URL is unavailable.
Atlas.root = (() => {
  const src = document.currentScript?.src || "";
  const marker = "assets/app/namespace.js";
  const index = src.indexOf(marker);
  if (index >= 0) return src.slice(0, index);
  return new URL(".", document.baseURI).href;
})();

// Resolves a site-relative path against the atlas root.
Atlas.url = path => Atlas.root + path;
