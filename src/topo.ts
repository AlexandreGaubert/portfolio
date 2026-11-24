// The contour lines of the LinkedIn banner, drawn once at build time.
const W = 1440;
const H = 560;

export function renderTopo(): string {
  const paths: string[] = [];
  for (let k = 0; k < 30; k++) {
    const base = -40 + k * (H / 24);
    let d = '';
    for (let x = 0; x <= W; x += 12) {
      const t = x / W;
      const y =
        base +
        26 * Math.sin(t * 5.2 + k * 0.16) +
        14 * Math.sin(t * 11.3 - k * 0.27 + 1.3) +
        6 * Math.sin(t * 23 + k * 0.5) +
        30 * Math.sin(k * 0.21) * t;
      d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
    }
    const accent = k % 7 === 3;
    const opacity = accent ? 0.32 : 0.1 + 0.1 * Math.sin(k * 0.4) ** 2;
    paths.push(
      `<path d="${d}" stroke="${accent ? '#b8603c' : '#2b5c8a'}" stroke-opacity="${opacity.toFixed(3)}" stroke-width="${accent ? 1.3 : 1}"/>`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" fill="none">${paths.join('')}</svg>\n`;
}
