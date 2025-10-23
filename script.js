/**
 * Portfolio Website - Interactive Features
 * Blue/White/Black Theme
 * Optimized for accessibility and performance
 */

(function() {
  'use strict';

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // MOBILE MENU
  // ============================================

  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!menuToggle || !navLinks) return;

    function toggleMenu() {
      const isOpen = navLinks.classList.contains('active');
      
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isOpen);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMenu() {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on a nav link
    navItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================

  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = debounce(() => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  function initSmoothScroll() {
    // Only add smooth scroll if user doesn't prefer reduced motion
    if (supportsReducedMotion) return;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ============================================
  // INTERSECTION OBSERVER - FADE IN ANIMATIONS
  // ============================================

  function initScrollAnimations() {
    // Skip animations if user prefers reduced motion
    if (supportsReducedMotion) {
      document.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for multiple elements
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHTER
  // ============================================

  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -66% 0px'
    };

    let currentActiveLink = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

          if (activeLink && activeLink !== currentActiveLink) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current link
            activeLink.classList.add('active');
            currentActiveLink = activeLink;
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ============================================
  // PARTICLE EFFECT (Optional Enhancement)
  // ============================================

  function createParticleEffect() {
    // Skip if reduced motion is preferred
    if (supportsReducedMotion) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    canvas.style.zIndex = '1';

    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(43, 176, 255, 0.4)';
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(43, 176, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    }

    // Initialize
    resizeCanvas();
    createParticles();
    drawParticles();

    // Handle resize
    window.addEventListener('resize', debounce(() => {
      resizeCanvas();
      createParticles();
    }, 250));

    // Pause animation when not visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        } else if (entry.isIntersecting) {
          drawParticles();
        }
      });
    });

    heroObserver.observe(hero);
  }

  // ============================================
  // TYPING EFFECT (Optional)
  // ============================================

  function initTypingEffect() {
    if (supportsReducedMotion) return;

    const typingElement = document.querySelector('.hero-title .gradient-text');
    if (!typingElement) return;

    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.display = 'inline-block';

    let charIndex = 0;

    function type() {
      if (charIndex < originalText.length) {
        typingElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
      }
    }

    // Start typing after a small delay
    setTimeout(type, 500);
  }

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================

  function logPerformance() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #2bb0ff; font-weight: bold;');
      });
    }
  }

  // ============================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================

  function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      section.setAttribute('role', 'region');
      const heading = section.querySelector('h2');
      if (heading) {
        const id = `${section.id}-label`;
        heading.id = id;
        section.setAttribute('aria-labelledby', id);
      }
    });
  }

  // ============================================
  // THEME PREFERENCE (Future Enhancement)
  // ============================================

  function detectColorScheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(`%c🎨 User prefers: ${darkModeQuery.matches ? 'dark' : 'light'} mode`, 'color: #2bb0ff;');
    
    // Listen for changes
    darkModeQuery.addEventListener('change', (e) => {
      console.log(`%c🎨 Theme changed to: ${e.matches ? 'dark' : 'light'} mode`, 'color: #2bb0ff;');
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    console.log('%c🚀 Portfolio Initialized', 'color: #2bb0ff; font-size: 16px; font-weight: bold;');
    console.log('%c📱 Accessibility features enabled', 'color: #2bb0ff;');
    console.log('%c♿ Respecting prefers-reduced-motion:', supportsReducedMotion, 'color: #2bb0ff;');

    // Core features
    initAccessibility();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavHighlight();

    // Enhanced features (optional)
    // createParticleEffect(); // Uncomment for particle effect
    // initTypingEffect(); // Uncomment for typing effect

    // Utilities
    detectColorScheme();
    logPerformance();

    // Announce loaded state
    document.body.classList.add('loaded');
  }

  // ============================================
  // START APPLICATION
  // ============================================

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities for debugging (optional)
  window.portfolioUtils = {
    version: '1.0.0',
    reducedMotion: supportsReducedMotion,
    refresh: init
  };

})();
