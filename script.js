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

// Hide default cursor on all interactive elements
const styleTag = document.createElement('style');
styleTag.textContent = 'a, button, input, select, textarea, label, [role="button"], [onclick] { cursor: none !important; }';
document.head.appendChild(styleTag);

let isHovering = false;
let hoverScale = 1;

const clickables = 'a, button, input, select, textarea, label, [role="button"], [onclick]';

document.querySelectorAll(clickables).forEach(el => {
  el.addEventListener('mouseenter', () => { isHovering = true; });
  el.addEventListener('mouseleave', () => { isHovering = false; });
});

// Also catch dynamically added elements
document.addEventListener('mouseover', e => {
  if (e.target.closest(clickables)) { isHovering = true; }
  else { isHovering = false; }
});

// Click burst: mini brains explode outward
document.addEventListener('click', e => {
  const count = 7;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.style.cssText = `
      position:fixed; pointer-events:none; z-index:9998;
      width:18px; height:12px;
      background-image:url('images/logo.png');
      background-size:contain; background-repeat:no-repeat;
      left:${e.clientX - 9}px; top:${e.clientY - 6}px;
      transition: none;
    `;
    document.body.appendChild(b);
    const angle = (i / count) * Math.PI * 2;
    const dist = 40 + Math.random() * 30;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    requestAnimationFrame(() => {
      b.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      b.style.transform = `translate(${tx}px, ${ty}px) scale(0.3) rotate(${Math.random()*360}deg)`;
      b.style.opacity = '0';
    });
    setTimeout(() => b.remove(), 520);
  }
});

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

  const targetScale = isHovering ? 1.05 : 1;
  hoverScale += (targetScale - hoverScale) * 0.12;

  const finalScale = hoverScale;

  const breathW = 32 * finalScale + Math.sin(t * 1.3) * 0.8;
  const breathH = 22 * finalScale + Math.cos(t * 1.7) * 0.5;
  cursor.style.width  = breathW + 'px';
  cursor.style.height = breathH + 'px';

  const wiggle = isHovering ? Math.sin(now * 0.008) * 12 : 0;
  cursor.style.transform = `translate(-50%, -50%) rotate(${wiggle}deg)`;

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

      const w = 32 * scale;
      const h = 22 * scale;

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
