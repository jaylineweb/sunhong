// ----- Google Translate & 언어 전환 (공통) -----
function googleTranslateElementInit() {
  if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
    new google.translate.TranslateElement({
      pageLanguage: 'ko',
      includedLanguages: 'zh-CN,ja,en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  }
}

(function () {
  var langLabels = { ko: 'KR', 'zh-CN': 'CN', ja: 'JP', en: 'EN' };
  function getCurrentLang() {
    var m = document.cookie.match(/googtrans=([^;]+)/);
    return m ? (m[1].split('/')[2] || 'ko') : 'ko';
  }
  var langToClass = { 'zh-CN': 'chinese', ja: 'japanese', en: 'english' };
  var flagAlt = { ko: '한국어', zh: '중국말', ja: '일본말', en: '영어' };
  function updateLanguageFlag() {
    var lang = getCurrentLang();
    var srcKey = (lang === 'zh-CN' ? 'zh' : lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'ko');
    document.querySelectorAll('.language .taegukgi-icon .lang-flag').forEach(function (img) {
      var src = img.getAttribute('data-src-' + srcKey) || img.getAttribute('data-src-ko');
      if (src) { img.src = src; }
      img.alt = flagAlt[srcKey] || flagAlt.ko;
    });
  }
  function updateLangBtn() {
    var lang = getCurrentLang();
    var label = langLabels[lang] || 'KR';
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var textEl = btn.querySelector('.lang-btn-text');
      if (textEl) textEl.textContent = label;
      else btn.textContent = label + ' ▾';
    });
  }
  function updateLanguageClass() {
    var lang = getCurrentLang();
    var addClass = langToClass[lang] || null;
    document.querySelectorAll('.language').forEach(function (el) {
      el.classList.remove('chinese', 'japanese', 'english');
      if (addClass) el.classList.add(addClass);
    });
  }
  updateLangBtn();
  updateLanguageClass();
  updateLanguageFlag();
  var nameEl = document.querySelector('.privacy-officer-name');
  if (nameEl) {
    nameEl.textContent = (getCurrentLang() === 'zh-CN' || getCurrentLang() === 'ja' || getCurrentLang() === 'en') ? 'Yoon hong 대표님' : '윤현우';
  }
  document.querySelectorAll('.lang-dropdown a[data-lang]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = this.getAttribute('data-lang');
      if (lang === 'ko') {
        document.cookie = 'googtrans=; path=/; max-age=0';
      } else {
        document.cookie = 'googtrans=/ko/' + lang + '; path=/; max-age=86400';
      }
      location.reload();
    });
  });
})();

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

// Language Dropdown (데스크톱 + 모바일 각각)
document.querySelectorAll('.language').forEach((lang) => {
  const langBtn = lang.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      lang.classList.toggle('active');
    });
  }
});
document.addEventListener('click', () => {
  document.querySelectorAll('.language').forEach((lang) => lang.classList.remove('active'));
});

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
  // Nav buttons (드래그보다 먼저 생성해 mousedown에서 제외 가능하도록)
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

  // 마우스 드래그 (화살표 영역 클릭 시에는 드래그 시작하지 않음 → click 이벤트 정상 발생)
  carouselEl.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    if (e.target.closest('.factory-process-carousel__nav')) return;
    e.preventDefault();
    startDrag(e.clientX);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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


