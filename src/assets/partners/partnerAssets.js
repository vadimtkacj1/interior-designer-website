const modules = import.meta.glob('./*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
});

function resolveUrl(mod) {
  if (!mod) return '';
  if (typeof mod === 'string') return mod;
  return mod.default ?? '';
}

export const partnerLogos = Object.entries(modules)
  .map(([path, mod]) => {
    const src = resolveUrl(mod);
    if (!src) return null;
    const fileName = path.split('/').pop() || '';
    const alt = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').trim() || 'שותף';
    return { src, alt };
  })
  .filter(Boolean)
  .sort((a, b) => a.alt.localeCompare(b.alt, undefined, { numeric: true }));
