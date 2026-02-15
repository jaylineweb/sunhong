// GNB Dropdown (데스크톱)
document.querySelectorAll('.gnb:not(.gnb-mobile) .has-dropdown').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('active');
  });
});

// 모바일 메뉴 열기/닫기
const header = document.querySelector('.header');
const btnMenu = document.querySelector('.btn-menu');
const btnClose = document.querySelector('.btn-close');
const gnbOverlay = document.querySelector('.gnb-overlay');

function openMenu() {
  if (header) {
    header.classList.add('menu-open');
    btnMenu && btnMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  if (header) {
    header.classList.remove('menu-open');
    btnMenu && btnMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

if (btnMenu) {
  btnMenu.addEventListener('click', openMenu);
}
if (btnClose) {
  btnClose.addEventListener('click', closeMenu);
}
if (gnbOverlay) {
  gnbOverlay.addEventListener('click', closeMenu);
}

// 모바일 GNB 아코디언 (드로어 내부)
document.querySelectorAll('.gnb-mobile .has-dropdown').forEach(item => {
  const link = item.querySelector('.gnb-link');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.toggle('open');
    });
  }
});

// 드로어 내부 2depth(실제 페이지) 링크 클릭 시에만 메뉴 닫기 (1depth 아코디언 클릭 시에는 닫지 않음)
document.querySelectorAll('.gnb-mobile .depth2 a').forEach((a) => {
  a.addEventListener('click', () => closeMenu());
});

// Language Dropdown
const lang = document.querySelector('.language');
const langBtn = document.querySelector('.lang-btn');
if (lang && langBtn) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lang.classList.toggle('active');
  });
  document.addEventListener('click', () => {
    lang.classList.remove('active');
  });
}

// Carousel (Owl Carousel 스타일 옵션 참고)
const carousel = document.querySelector('.carousel');
const carouselConfig = {
  loop: true,
  items: 1,
  nav: false,
  dots: true,
  mouseDrag: false,              // 기본: 마우스 드래그 끔
  touchDrag: true,               // 기본: 터치 스와이프 켜짐
  autoplay: true,
  autoplaySpeed: 5000,
  dragThreshold: 50,
  responsive: {
    0:   { mouseDrag: true, touchDrag: true },
    640: { mouseDrag: true, touchDrag: true },
    1000: { mouseDrag: true, touchDrag: true }
  }
};

if (carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let currentIndex = 0;
  let autoPlayTimer;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    if (!carouselConfig.autoplay) return;
    autoPlayTimer = setInterval(nextSlide, carouselConfig.autoplaySpeed);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Owl처럼 responsive에서 현재 너비에 맞는 옵션 반환 (가장 큰 breakpoint <= width)
  function getResponsiveOption(optionName) {
    const w = window.innerWidth;
    const breaks = Object.keys(carouselConfig.responsive).map(Number).sort((a, b) => a - b);
    let breakpoint = null;
    for (let i = 0; i < breaks.length; i++) {
      if (breaks[i] <= w) breakpoint = breaks[i];
    }
    const resp = breakpoint != null ? carouselConfig.responsive[breakpoint] : {};
    return resp[optionName] !== undefined ? resp[optionName] : carouselConfig[optionName];
  }

  function isTouchDragEnabled() {
    return getResponsiveOption('touchDrag');
  }

  function isMouseDragEnabled() {
    return getResponsiveOption('mouseDrag');
  }

  if (carouselConfig.autoplay) startAutoPlay();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(i);
      startAutoPlay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  const threshold = carouselConfig.dragThreshold || 50;

  // 터치 스와이프 (touchDrag)
  let touchStartX = 0;
  let touchEndX = 0;
  carousel.addEventListener('touchstart', (e) => {
    if (!isTouchDragEnabled()) return;
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isTouchDragEnabled()) return;
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  }, { passive: true });

  // 마우스 드래그 (mouseDrag, Owl의 mouseDrag)
  let mouseStartX = 0;
  let mouseEndX = 0;
  carousel.addEventListener('mousedown', (e) => {
    if (!isMouseDragEnabled()) return;
    mouseStartX = e.clientX;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!isMouseDragEnabled()) return;
    mouseEndX = e.clientX;
    const diff = mouseStartX - mouseEndX;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  });
}
