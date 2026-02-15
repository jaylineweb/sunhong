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

// Carousel
const carousel = document.querySelector('.carousel');
const CAROUSEL_SWIPE_BREAKPOINT = 1000; // 1000px 이하에서만 스와이프 활성화

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
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  function isSwipeEnabled() {
    return window.matchMedia('(max-width: ' + CAROUSEL_SWIPE_BREAKPOINT + 'px)').matches;
  }

  // Autoplay 비활성화 (필요 시 아래 주석 해제)
  // startAutoPlay();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(i);
      startAutoPlay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', () => {}); // autoplay 꺼둔 상태라 비움

  // 1000px 이하에서 스와이프로 슬라이드 전환
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    if (!isSwipeEnabled()) return;
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isSwipeEnabled()) return;
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  }, { passive: true });
}
