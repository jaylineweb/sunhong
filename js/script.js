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

// Factory process carousel (vanilla JS) – drag & swipe 지원
(function () {
  const MARGIN = 10;
  const BREAKPOINT = 768;
  const DRAG_THRESHOLD = 50;

  const carouselEl = document.querySelector('.factory-process-carousel');
  const trackEl = document.querySelector('.factory-process-carousel__track');
  if (!carouselEl || !trackEl) return;

  const items = trackEl.querySelectorAll('.factory-process-carousel__item');
  if (!items.length) return;

  let currentIndex = 0;
  let perView = 2;
  let itemWidth = 0;
  let isDragging = false;
  let dragStartX = 0;
  let baseOffset = 0;

  function getPerView() {
    return window.innerWidth >= BREAKPOINT ? 2 : 1;
  }

  function updateLayout() {
    perView = getPerView();
    const viewportWidth = carouselEl.offsetWidth;
    itemWidth = (viewportWidth - MARGIN * (perView - 1)) / perView;
    const trackWidth = items.length * itemWidth + MARGIN * (items.length - 1);

    trackEl.style.display = 'flex';
    trackEl.style.gap = MARGIN + 'px';
    trackEl.style.width = trackWidth + 'px';
    trackEl.style.transition = 'transform 0.3s ease';
    items.forEach(function (item) {
      item.style.flexShrink = '0';
      item.style.width = itemWidth + 'px';
    });
    goTo(currentIndex);
  }

  function getMaxIndex() {
    return Math.max(0, items.length - perView);
  }

  function goTo(index) {
    const maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIdx));
    const offset = currentIndex * (itemWidth + MARGIN);
    trackEl.style.transform = 'translate3d(-' + offset + 'px, 0, 0)';
  }

  function next() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      goTo(0);
    } else {
      goTo(currentIndex + 1);
    }
  }

  function prev() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      goTo(maxIdx);
    } else {
      goTo(currentIndex - 1);
    }
  }

  function startDrag(clientX) {
    if (isDragging) return;
    isDragging = true;
    dragStartX = clientX;
    baseOffset = currentIndex * (itemWidth + MARGIN);
    trackEl.style.transition = 'none';
    carouselEl.classList.add('is-dragging');
  }

  function moveDrag(clientX) {
    if (!isDragging || !itemWidth) return;
    const dragOffset = clientX - dragStartX;
    const x = baseOffset - dragOffset;
    trackEl.style.transform = 'translate3d(-' + x + 'px, 0, 0)';
  }

  function endDrag(clientX) {
    if (!isDragging) return;
    const dragOffset = clientX - dragStartX;
    trackEl.style.transition = 'transform 0.3s ease';
    carouselEl.classList.remove('is-dragging');
    if (dragOffset > DRAG_THRESHOLD) {
      prev();
    } else if (dragOffset < -DRAG_THRESHOLD) {
      next();
    } else {
      goTo(currentIndex);
    }
    isDragging = false;
  }

  // 터치 스와이프
  carouselEl.addEventListener('touchstart', function (e) {
    startDrag(e.changedTouches[0].clientX);
  }, { passive: true });

  carouselEl.addEventListener('touchmove', function (e) {
    moveDrag(e.changedTouches[0].clientX);
  }, { passive: true });

  carouselEl.addEventListener('touchend', function (e) {
    endDrag(e.changedTouches[0].clientX);
  }, { passive: true });

  // 마우스 드래그
  function onMouseMove(e) {
    moveDrag(e.clientX);
  }
  function onMouseUp(e) {
    endDrag(e.clientX);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  carouselEl.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientX);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Nav buttons
  const nav = document.createElement('div');
  nav.className = 'factory-process-carousel__nav';
  nav.setAttribute('aria-label', '캐러셀 이전/다음');
  const btnPrev = document.createElement('button');
  btnPrev.type = 'button';
  btnPrev.className = 'factory-process-carousel__nav-prev';
  btnPrev.setAttribute('aria-label', '이전');
  btnPrev.innerHTML = '&#10094;';
  const btnNext = document.createElement('button');
  btnNext.type = 'button';
  btnNext.className = 'factory-process-carousel__nav-next';
  btnNext.setAttribute('aria-label', '다음');
  btnNext.innerHTML = '&#10095;';
  nav.appendChild(btnPrev);
  nav.appendChild(btnNext);
  carouselEl.appendChild(nav);

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  updateLayout();
  window.addEventListener('resize', updateLayout);
})();

// Carousel (Owl Carousel 스타일 옵션 참고)
const carousel = document.querySelector('.carousel');
const carouselConfig = {
  loop: true,
  items: 1,
  nav: false,
  dots: true,
  swipe: true,                   // 터치/마우스 스와이프(드래그) 일괄 on/off
  mouseDrag: true,
  touchDrag: true,
  autoplay: true,
  autoplaySpeed: 5000,
  dragThreshold: 50,
  responsive: {
    0:   { swipe: true },
    640: { swipe: true },
    1000: { swipe: true }
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
    const swipe = getResponsiveOption('swipe');
    if (swipe !== undefined) return swipe;
    return getResponsiveOption('touchDrag');
  }

  function isMouseDragEnabled() {
    const swipe = getResponsiveOption('swipe');
    if (swipe !== undefined) return swipe;
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

const rows = document.querySelectorAll('.process-row');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{ threshold: 0.3 });

rows.forEach(row=>{
  observer.observe(row);
});


