if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {

const cursor = document.getElementById('cursor');
const MAX_CLOUDS = 22;
const clouds = [];
let trail = [];
let lastX = 0, lastY = 0;
let velX = 0, velY = 0;
let smoothAngle = 0;

for (let i = 0; i < MAX_CLOUDS; i++) {
  const d = document.createElement('div');
  d.className = 'cloud';
  document.body.appendChild(d);
  clouds.push(d);
}

document.addEventListener('mousemove', e => {
  velX = e.clientX - lastX;
  velY = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
  if (trail.length > MAX_CLOUDS * 3) trail = trail.slice(-MAX_CLOUDS * 3);
});

function lerpAngle(a, b, t) {
  let diff = b - a;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return a + diff * t;
}

function animate(now) {
  const speed = Math.sqrt(velX * velX + velY * velY);
  const targetAngle = speed > 1 ? Math.atan2(velY, velX) * (180 / Math.PI) : smoothAngle;
  smoothAngle = lerpAngle(smoothAngle, targetAngle, 0.12);

  const t = now * 0.0018;
  const breathW = 42 + Math.sin(t * 1.3) * 1.5;
  const breathH = 29 + Math.cos(t * 1.7) * 1;
  cursor.style.width  = breathW + 'px';
  cursor.style.height = breathH + 'px';

  velX *= 0.75;
  velY *= 0.75;

  const recent = trail.filter(p => now - p.t < 700);

  clouds.forEach((cloud, i) => {
    const idx = recent.length - 1 - i * 2;
    if (idx >= 0) {
      const p = recent[idx];
      const age = (now - p.t) / 700;
      const scale = Math.max(0.1, (1 - age) * 0.65);
      const alpha = Math.max(0, 0.8 - age * 1.1);

      const w = 42 * scale;
      const h = 29 * scale;

      cloud.style.left      = (p.x - w / 2) + 'px';
      cloud.style.top       = (p.y - h / 2) + 'px';
      cloud.style.width     = w + 'px';
      cloud.style.height    = h + 'px';
      cloud.style.opacity   = alpha;
      cloud.style.transform = `rotate(${smoothAngle * 0.25}deg)`;
    } else {
      cloud.style.opacity = 0;
    }
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

} // end touch guard
