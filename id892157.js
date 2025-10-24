/**
 * ============================================
 * ULTRA-PROFESSIONAL JAVASCRIPT ARCHITECTURE
 * ============================================
 * Performance-optimized, modular, and scalable
 */

'use strict';

// ============================================
// UTILITY FUNCTIONS & HELPERS
// ============================================

const Utils = {
  // Throttle function for performance optimization
  throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  },

  // Debounce function for event optimization
  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Linear interpolation for smooth animations
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  },

  // Clamp value between min and max
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
};

// ============================================
// PROFESSIONAL CURSOR SYSTEM
// ============================================

class CustomCursor {
  constructor() {
    this.cursor = this.createCursor();
    this.dot = this.createDot();
    this.mouse = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.dotPos = { x: 0, y: 0 };
    this.isHovering = false;

    this.init();
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    return cursor;
  }

  createDot() {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    return dot;
  }

  init() {
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dotPos.x = e.clientX;
      this.dotPos.y = e.clientY;
    });

    // Hover effect on interactive elements
    const hoverElements = 'a, button, input, textarea, .feature, .logo';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(hoverElements)) {
        this.cursor.classList.add('hover');
        this.isHovering = true;
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(hoverElements)) {
        this.cursor.classList.remove('hover');
        this.isHovering = false;
      }
    });

    // Start animation loop
    this.animate();
  }

  animate() {
    // Smooth cursor lag effect
    const lerpFactor = this.isHovering ? 0.2 : 0.15;
    
    this.cursorPos.x = Utils.lerp(this.cursorPos.x, this.mouse.x, lerpFactor);
    this.cursorPos.y = Utils.lerp(this.cursorPos.y, this.mouse.y, lerpFactor);

    // Apply transforms
    this.cursor.style.transform = `translate(${this.cursorPos.x}px, ${this.cursorPos.y}px)`;
    this.dot.style.transform = `translate(${this.dotPos.x}px, ${this.dotPos.y}px)`;

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// ADVANCED PRELOADER SYSTEM
// ============================================

class Preloader {
  constructor() {
    this.preloader = this.createPreloader();
    this.loadingComplete = false;
    this.minimumTimePassed = false;
    this.minimumDisplayTime = 2000;

    this.init();
  }

  createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
      <div class="loader-container">
        <div class="spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="loading-text">LOADING</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    `;
    document.body.prepend(preloader);
    document.body.classList.add('loading');
    return preloader;
  }

  init() {
    // Minimum display time
    setTimeout(() => {
      this.minimumTimePassed = true;
      this.checkComplete();
    }, this.minimumDisplayTime);

    // Wait for page load
    window.addEventListener('load', () => {
      this.loadingComplete = true;
      this.checkComplete();
    });
  }

  checkComplete() {
    if (this.loadingComplete && this.minimumTimePassed) {
      this.hide();
    }
  }

  hide() {
    document.body.classList.remove('loading');
    
    // Cleanup after transition
    setTimeout(() => {
      if (this.preloader && this.preloader.parentNode) {
        this.preloader.remove();
      }
    }, 1000);
  }
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

class ScrollProgress {
  constructor() {
    this.indicator = this.createIndicator();
    this.init();
  }

  createIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    return indicator;
  }

  init() {
    const updateProgress = Utils.throttle(() => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      this.indicator.style.width = `${Utils.clamp(scrolled, 0, 100)}%`;
    }, 10);

    window.addEventListener('scroll', updateProgress, { passive: true });
  }
}

// ============================================
// ADVANCED STAR FIELD ANIMATION
// ============================================

class StarField {
  constructor() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.stars = [];
    this.mouse = { x: 0, y: 0 };
    this.parallaxStrength = 20;

    this.init();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'stars';
    document.body.prepend(canvas);
    return canvas;
  }

  init() {
    this.resize();
    this.createStars();
    
    window.addEventListener('resize', Utils.debounce(() => this.resize(), 250));
    
    document.addEventListener('mousemove', Utils.throttle((e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * this.parallaxStrength;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * this.parallaxStrength;
    }, 16));

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    const starCount = Math.min(200, Math.floor(window.innerWidth / 5));
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2,
        speed: 0.1 + Math.random() * 0.5,
        opacity: Math.random(),
        twinkleSpeed: 0.01 + Math.random() * 0.02
      });
    }
  }

  animate() {
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars
    for (let star of this.stars) {
      // Twinkling effect
      star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
      star.opacity = Utils.clamp(star.opacity, 0.2, 1);

      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Move stars
      star.y += star.speed;
      
      // Reset star position
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
    }

    // Parallax effect
    this.canvas.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          this.scrollTo(targetElement);
        }
      });
    });
  }

  scrollTo(element) {
    const headerOffset = 80;
    const targetPosition = element.offsetTop - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}

// ============================================
// HEADER SCROLL EFFECTS
// ============================================

class HeaderEffects {
  constructor() {
    this.header = document.querySelector('header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    const handleScroll = Utils.throttle(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      this.lastScroll = currentScroll;
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

class ScrollAnimations {
  constructor() {
    this.sections = document.querySelectorAll('.content-section, .features');
    this.init();
  }

  init() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.sections.forEach(section => observer.observe(section));
  }
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================

class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('button');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.2;
        const moveY = y * 0.2;

        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }
}

// ============================================
// 3D TILT EFFECT FOR FEATURE CARDS
// ============================================

class CardTiltEffect {
  constructor() {
    this.cards = document.querySelectorAll('.feature');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      });
    });
  }
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================

class ParallaxEffects {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.cards = document.querySelectorAll('.feature');
    this.init();
  }

  init() {
    const handleScroll = Utils.throttle(() => {
      const scrolled = window.pageYOffset;

      // Hero parallax
      if (this.hero) {
        this.hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        this.hero.style.opacity = Math.max(0, 1 - scrolled / 800);
      }

      // Card parallax
      this.cards.forEach((card, index) => {
        const speed = 0.05 + index * 0.02;
        const cardTop = card.offsetTop;
        const cardScroll = scrolled - cardTop;

        if (cardScroll > -500 && cardScroll < 500) {
          card.style.transform = `translateY(${cardScroll * speed}px)`;
        }
      });
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// ============================================
// FORM INPUT ENHANCEMENTS
// ============================================

class FormEnhancements {
  constructor() {
    this.inputs = document.querySelectorAll('.contact-section input, .contact-section textarea');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.02)';
      });

      input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
      });

      input.addEventListener('input', () => {
        if (input.value) {
          input.style.borderColor = 'var(--primary-300)';
        } else {
          input.style.borderColor = 'var(--glass-border)';
        }
      });
    });
  }
}

// ============================================
// FLOATING PARTICLES SYSTEM
// ============================================

class FloatingParticles {
  constructor() {
    this.particleInterval = 2000;
    this.init();
  }

  init() {
    setInterval(() => this.createParticle(), this.particleInterval);
  }

  createParticle() {
    const particle = document.createElement('div');
    
    Object.assign(particle.style, {
      position: 'fixed',
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      background: 'rgba(0, 191, 255, 0.5)',
      borderRadius: '50%',
      left: `${Math.random() * 100}%`,
      bottom: '-10px',
      pointerEvents: 'none',
      zIndex: '1',
      boxShadow: '0 0 10px rgba(0, 191, 255, 0.8)'
    });

    document.body.appendChild(particle);

    const duration = Math.random() * 3000 + 4000;
    const drift = Math.random() * 100 - 50;

    const animation = particle.animate([
      { transform: 'translateY(0) translateX(0)', opacity: 0 },
      { transform: `translateY(-${window.innerHeight}px) translateX(${drift}px)`, opacity: 1, offset: 0.1 },
      { transform: `translateY(-${window.innerHeight * 1.5}px) translateX(${drift * 2}px)`, opacity: 0 }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => particle.remove();
  }
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

class KonamiCode {
  constructor() {
    this.code = [];
    this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.code.push(e.key);
      this.code = this.code.slice(-10);

      if (this.code.join(',') === this.pattern.join(',')) {
        this.activate();
      }
    });
  }

  activate() {
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
}

// ============================================
// CONSOLE BRANDING
// ============================================

class ConsoleBranding {
  constructor() {
    this.init();
  }

  init() {
    const styles = [
      'font-size: 24px; font-weight: bold; color: #00bfff; text-shadow: 0 0 10px #00bfff;',
      'font-size: 14px; color: #0077ff;',
      'font-size: 12px; color: #7a8599;'
    ];
    
    console.log(
      '%cNAJIH CORP%c\n\n%cPowered by Ultra-Professional Architecture\n(c) 2025 - All Rights Reserved',
      styles[0],
      styles[2],
      styles[1]
    );
  }
}

// ============================================
// MAIN APPLICATION INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  new ConsoleBranding();
  new Preloader();
  
  // Initialize UI & Effects (Wait for minimum preloader time)
  window.addEventListener('load', () => {
    // Check for reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      new CustomCursor();
      new StarField();
      new ScrollProgress();
      new HeaderEffects();
      new ParallaxEffects();
      new MagneticButtons();
      new CardTiltEffect();
      new FloatingParticles();
      new KonamiCode();
    }
    
    // Initialize Functional & Accessibility Systems
    new SmoothScroll();
    new ScrollAnimations();
    new FormEnhancements();
  });
});
