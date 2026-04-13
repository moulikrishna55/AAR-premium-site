(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((element) => {
      if (!element.classList.contains('is-visible')) {
        revealObserver.observe(element);
      }
    });
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('leadName')?.value.trim() || '';
      const phone = document.getElementById('leadPhone')?.value.trim() || '';
      const projectType = document.getElementById('leadProjectType')?.value.trim() || '';
      const location = document.getElementById('leadLocation')?.value.trim() || '';
      const message = document.getElementById('leadMessage')?.value.trim() || '';

      const whatsappMessage = [
        'Hello AAR INFRA TECH, I would like to discuss a construction or interior project.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Project Type: ${projectType}`,
        `Project Location: ${location}`,
        `Project Details: ${message}`
      ].join('\n');

      const whatsappUrl = `https://wa.me/919100320063?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.slide-dot'));
  const titleEl = document.getElementById('slideTitle');
  const kickerEl = document.getElementById('slideKicker');
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primaryNav');
  const heroPanel = document.getElementById('heroPanel');
  const heroSlider = document.getElementById('heroSlider');
  const floatingActions = document.querySelector('.floating-actions');
  const contactSection = document.getElementById('contact');
  const footer = document.querySelector('footer');
  const root = document.documentElement;
  const slideIntervalMs = 5600;
  const touchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  let currentIndex = 0;
  let timerId = null;
  let touchStartX = 0;
  let touchStartY = 0;

  function closeMenu() {
    if (!header || !menuToggle) {
      return;
    }

    header.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    if (!header || !menuToggle) {
      return;
    }

    header.classList.add('nav-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  if (menuToggle && header && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('nav-open')) {
        return;
      }

      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  function setActiveSlide(nextIndex) {
    if (!slides.length || !dots.length) {
      return;
    }

    slides[currentIndex]?.classList.remove('active');
    dots[currentIndex]?.classList.remove('active');
    currentIndex = nextIndex;
    slides[currentIndex]?.classList.add('active');
    dots[currentIndex]?.classList.add('active');

    if (titleEl) {
      titleEl.textContent = slides[currentIndex].dataset.title || '';
    }

    if (kickerEl) {
      kickerEl.textContent = slides[currentIndex].dataset.kicker || '';
    }
  }

  function startSlider() {
    if (reducedMotion || slides.length <= 1) {
      return;
    }

    timerId = window.setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setActiveSlide(nextIndex);
    }, slideIntervalMs);
  }

  function stopSlider() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  if (slides.length && dots.length) {
    setActiveSlide(0);
    startSlider();
  }

  if (heroPanel && heroSlider && !reducedMotion && !touchDevice) {
    heroPanel.classList.add('is-interactive');

    heroPanel.addEventListener('mousemove', (event) => {
      const rect = heroPanel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tx = (x - 0.5) * -18;
      const ty = (y - 0.5) * -14;
      const rx = (0.5 - y) * 4;
      const ry = (x - 0.5) * 6;

      heroSlider.style.setProperty('--tx', `${tx}px`);
      heroSlider.style.setProperty('--ty', `${ty}px`);
      heroPanel.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      root.style.setProperty('--mx', `${x * 100}%`);
      root.style.setProperty('--my', `${y * 100}%`);
      root.style.setProperty('--lineShift', `${(x - 0.5) * 20}px`);
    });

    heroPanel.addEventListener('mouseleave', () => {
      heroSlider.style.setProperty('--tx', '0px');
      heroSlider.style.setProperty('--ty', '0px');
      heroPanel.style.transform = 'rotateX(0deg) rotateY(0deg)';
      root.style.setProperty('--mx', '50%');
      root.style.setProperty('--my', '50%');
      root.style.setProperty('--lineShift', '0px');
    });
  }

  if (heroPanel && slides.length > 1 && !reducedMotion && touchDevice) {
    heroPanel.addEventListener('touchstart', (event) => {
      const firstTouch = event.touches[0];
      touchStartX = firstTouch.clientX;
      touchStartY = firstTouch.clientY;
    }, { passive: true });

    heroPanel.addEventListener('touchend', (event) => {
      const changedTouch = event.changedTouches[0];
      const deltaX = changedTouch.clientX - touchStartX;
      const deltaY = changedTouch.clientY - touchStartY;

      if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      stopSlider();

      if (deltaX < 0) {
        setActiveSlide((currentIndex + 1) % slides.length);
      } else {
        setActiveSlide((currentIndex - 1 + slides.length) % slides.length);
      }

      startSlider();
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlider();
    } else if (!timerId && !reducedMotion) {
      startSlider();
    }
  });

  if (floatingActions && 'IntersectionObserver' in window) {
    const mobileQuery = window.matchMedia('(max-width: 560px)');
    const visibilityTargets = [contactSection, footer].filter(Boolean);
    let observer = null;

    function setFloatingVisibility(hidden) {
      floatingActions.classList.toggle('is-hidden', hidden);
    }

    function attachFloatingObserver() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      setFloatingVisibility(false);

      if (!mobileQuery.matches || !visibilityTargets.length) {
        return;
      }

      observer = new IntersectionObserver((entries) => {
        const shouldHide = entries.some((entry) => entry.isIntersecting);
        setFloatingVisibility(shouldHide);
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      });

      visibilityTargets.forEach((target) => observer.observe(target));
    }

    attachFloatingObserver();

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', attachFloatingObserver);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(attachFloatingObserver);
    }
  }
})();
