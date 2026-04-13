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
  const heroPanel = document.getElementById('heroPanel');
  const heroSlider = document.getElementById('heroSlider');
  const root = document.documentElement;
  const slideIntervalMs = 5600;
  let currentIndex = 0;
  let timerId = null;

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

  if (heroPanel && heroSlider && !reducedMotion) {
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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlider();
    } else if (!timerId && !reducedMotion) {
      startSlider();
    }
  });
})();
