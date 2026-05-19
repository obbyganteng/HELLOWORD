// ── Starfield ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
const root   = document.getElementById('hwRoot');

function resizeCanvas() {
  canvas.width  = root.offsetWidth;
  canvas.height = root.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 160 }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.8 + 0.3,
  speed: Math.random() * 0.4 + 0.05,
  blink: Math.random() * Math.PI * 2
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.blink += 0.02;
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.blink));

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();

    s.y -= s.speed;
    if (s.y < 0) {
      s.y = canvas.height;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}
drawStars();

// ── Particles ──────────────────────────────────────────────────────────────
const pContainer = document.getElementById('particles');
const COLORS = ['#00f0ff', '#a020f0', '#ff4080', '#ffe040', '#40ff80'];

function spawnParticle() {
  const el    = document.createElement('div');
  el.className = 'particle';

  const size  = Math.random() * 7 + 2;
  const left  = Math.random() * 100;
  const dur   = Math.random() * 4 + 2;
  const dx    = (Math.random() - 0.5) * 120;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: 0;
    background: ${color};
    box-shadow: 0 0 ${size * 2}px ${color};
    --dx: ${dx}px;
    animation-duration: ${dur}s;
    animation-delay: ${Math.random() * 2}s;
  `;

  pContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 2.5) * 1000);
}

setInterval(spawnParticle, 160);
