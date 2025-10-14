// STAR BACKGROUND
const canvas = document.createElement('canvas');
canvas.id = 'stars';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let w, h, stars = [];

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 200; i++) {
  stars.push({x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2});
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.3;
    if (s.y > h) s.y = 0;
  }
  requestAnimationFrame(animate);
}
animate();

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    // Get the target element ID
    const targetId = a.getAttribute('href');
    // Select the target element
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        // Scroll smoothly to the element
        targetElement.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Removed button click effect, as requested previously
