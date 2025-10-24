// === CUSTOM CURSOR ===
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Instant update for dot
  dotX = mouseX;
  dotY = mouseY;
});

// Smooth cursor following
function animateCursor() {
  // Smooth lag effect for outer ring
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = 'a, button, input, textarea, .feature';
document.addEventListener('mouseover', (e) => {
  if (e.target.matches(hoverElements)) {
    cursor.classList.add('hover');
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.matches(hoverElements)) {
    cursor.classList.remove('hover');
  }
});

// === ENHANCED PRE-LOADER ===
const preloader = document.createElement('div');
preloader.id = 'preloader';
preloader.innerHTML = `
  <div class="loader-container">
    <div class="spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <div class="loading-text">LOADING...</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
`;
document.body.prepend(preloader);
document.body.classList.add('loading');

// Enhanced loading with minimum display time
let loadingComplete = false;
let minimumTimePassed = false;

function checkLoadingComplete() {
  if (loadingComplete && minimumTimePassed) {
    document.body.classList.remove('loading');
  }
}

// Minimum loading time of 2 seconds for smooth experience
setTimeout(() => {
  minimumTimePassed = true;
  checkLoadingComplete();
}, 2000);

window.addEventListener('load', () => {
  loadingComplete = true;
  checkLoadingComplete();
});

// === SCROLL PROGRESS INDICATOR ===
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollIndicator.style.width = scrolled + '%';
});

// === ENHANCED STAR BACKGROUND ===
const canvas = document.createElement('canvas');
canvas.id = 'stars';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let w, h, stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Create stars with varying properties
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2,
    speed: 0.1 + Math.random() * 0.5,
    opacity: Math.random()
  });
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, w, h);
  
  for (let s of stars) {
    // Twinkling effect
    s.opacity += (Math.random() - 0.5) * 0.1;
    s.opacity = Math.max(0.2, Math.min(1, s.opacity));
    
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    
    // Move stars
    s.y += s.speed;
    if (s.y > h) {
      s.y = 0;
      s.x = Math.random() * w;
    }
  }
  requestAnimationFrame(animate);
}
animate();

// === PARALLAX EFFECT FOR STARS ===
let mouseParallaxX = 0;
let mouseParallaxY = 0;

document.addEventListener('mousemove', (e) => {
  mouseParallaxX = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseParallaxY = (e.clientY / window.innerHeight - 0.5) * 20;
  
  canvas.style.transform = `translate(${mouseParallaxX}px, ${mouseParallaxY}px)`;
});

// === SMOOTH SCROLL WITH EASING ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const targetId = a.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Custom smooth scroll with easing
      const targetPosition = targetElement.offsetTop - 80; // Account for header
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let start = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  });
});

// === HEADER SCROLL EFFECT ===
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// === SCROLL-TRIGGERED ANIMATIONS (Enhanced Intersection Observer) ===
const sectionsToAnimate = document.querySelectorAll('.content-section, .features');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add entrance animation with slight delay
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, 100);
      
      // Stop observing after animation
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

sectionsToAnimate.forEach(section => {
  observer.observe(section);
});

// === MAGNETIC BUTTON EFFECT ===
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0) scale(1)';
  });
});

// === FEATURE CARDS TILT EFFECT ===
const featureCards = document.querySelectorAll('.feature');

featureCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// === PARALLAX SCROLL EFFECT FOR SECTIONS ===
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Parallax for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 800);
  }
  
  // Parallax for feature cards
  featureCards.forEach((card, index) => {
    const speed = 0.05 + (index * 0.02);
    const cardTop = card.offsetTop;
    const cardScroll = scrolled - cardTop;
    
    if (cardScroll > -500 && cardScroll < 500) {
      card.style.transform = `translateY(${cardScroll * speed}px)`;
    }
  });
});

// === FORM INPUT ANIMATIONS ===
const formInputs = document.querySelectorAll('.contact-section input, .contact-section textarea');

formInputs.forEach(input => {
  // Focus effect
  input.addEventListener('focus', () => {
    input.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', () => {
    input.style.transform = 'scale(1)';
  });
  
  // Floating label effect (if value exists)
  input.addEventListener('input', () => {
    if (input.value) {
      input.style.borderColor = 'var(--primary-color)';
    } else {
      input.style.borderColor = 'var(--border-color)';
    }
  });
});

// === TYPING EFFECT FOR HERO TEXT (Optional Enhancement) ===
const heroText = document.querySelector('.hero p');
if (heroText) {
  const originalText = heroText.textContent;
  heroText.textContent = '';
  
  let charIndex = 0;
  
  function typeText() {
    if (charIndex < originalText.length) {
      heroText.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 50);
    }
  }
  
  // Start typing after page loads
  window.addEventListener('load', () => {
    setTimeout(typeText, 1500);
  });
}

// === FLOATING PARTICLES EFFECT ===
function createFloatingParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = Math.random() * 4 + 2 + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = 'rgba(0, 191, 255, 0.5)';
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.bottom = '-10px';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '1';
  particle.style.boxShadow = '0 0 10px rgba(0, 191, 255, 0.8)';
  
  document.body.appendChild(particle);
  
  const duration = Math.random() * 3000 + 4000;
  const drift = Math.random() * 100 - 50;
  
  particle.animate([
    { transform: 'translateY(0) translateX(0)', opacity: 0 },
    { transform: `translateY(-${window.innerHeight}px) translateX(${drift}px)`, opacity: 1, offset: 0.1 },
    { transform: `translateY(-${window.innerHeight * 1.5}px) translateX(${drift * 2}px)`, opacity: 0 }
  ], {
    duration: duration,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createFloatingParticle, 2000);

// === SMOOTH REVEAL ON LOAD ===
window.addEventListener('load', () => {
  // Add loaded class to body for any additional effects
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 2000);
});

// === PERFORMANCE OPTIMIZATION ===
// Throttle scroll events
let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Scroll-based animations here
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll);

// === EASTER EGG: Konami Code ===
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
      style.remove();
    }, 5000);
  }
});

// === CONSOLE MESSAGE (Branding) ===
console.log('%c🚀 FX-EXPO', 'font-size: 24px; font-weight: bold; color: #00bfff; text-shadow: 0 0 10px #00bfff;');
console.log('%cInnovating. Creativity. Endsuphere', 'font-size: 14px; color: #0077ff;');
console.log('%cBuilt with ultra-smooth animations 💫', 'font-size: 12px; color: #ccc;');
