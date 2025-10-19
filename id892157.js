// === PRE-LOADER & BODY CLASS MANAGEMENT ===
// 1. Create and insert the preloader element (since HTML cannot be edited)
const preloader = document.createElement('div');
preloader.id = 'preloader';
preloader.innerHTML = '<div class="spinner"></div>';
document.body.prepend(preloader);
document.body.classList.add('loading'); // Start with the loading class

// 2. Function to hide the preloader after a delay
function hidePreloader() {
    // Wait for a minimum of 1 second for a smooth loading feel
    setTimeout(() => {
        document.body.classList.remove('loading');
        // The CSS handles the fade-out transition of the #preloader element
    }, 1000); 
}

// 3. Attach the hiding function to the window load event
window.addEventListener('load', hidePreloader);


// === STAR BACKGROUND (Original Code) ===
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


// === SMOOTH SCROLL (Original Code) ===
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


// === SCROLL-TRIGGERED ANIMATIONS (Intersection Observer) ===

const sectionsToAnimate = document.querySelectorAll('.content-section, .features');

// Options for the observer (when to trigger the animation)
const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
};

// Callback function when an element enters or exits the viewport
function observerCallback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'in-view' class to trigger the CSS animation
            entry.target.classList.add('in-view');
            // Stop observing the element after it's been animated once
            observer.unobserve(entry.target); 
        }
    });
}

// Create the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Start observing each section
sectionsToAnimate.forEach(section => {
    observer.observe(section);
});
