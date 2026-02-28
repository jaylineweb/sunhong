/**
 * 인증서 라이트박스 (슬라이드)
 * certificate.html 전용
 */
(function () {
  const lightbox = document.getElementById('certificateLightbox');
  const list = document.querySelector('.certificate_list');
  if (!lightbox || !list) return;

  const overlay = lightbox.querySelector('.certificate-lightbox__overlay');
  const closeBtn = lightbox.querySelector('.certificate-lightbox__close');
  const prevBtn = lightbox.querySelector('.certificate-lightbox__prev');
  const nextBtn = lightbox.querySelector('.certificate-lightbox__next');
  const imgEl = lightbox.querySelector('.certificate-lightbox__img');
  const captionEl = lightbox.querySelector('.certificate-lightbox__caption');

  const items = Array.from(list.querySelectorAll('.certificate_item'));
  const slides = items.map(function (item) {
    const img = item.querySelector('.certificate_imagebox img');
    const title = item.querySelector('.certificate_title');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
      caption: title ? title.textContent.trim() : ''
    };
  });

  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const s = slides[currentIndex];
    imgEl.setAttribute('src', s.src);
    imgEl.setAttribute('alt', s.alt);
    captionEl.textContent = s.caption;
  }

  function open(index) {
    currentIndex = index;
    showSlide(currentIndex);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    prevBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  items.forEach(function (item, index) {
    const box = item.querySelector('.certificate_imagebox');
    if (!box) return;
    function openThis() {
      open(index);
    }
    box.addEventListener('click', openThis);
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openThis();
      }
    });
  });

  if (overlay) overlay.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(currentIndex + 1); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showSlide(currentIndex - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      showSlide(currentIndex + 1);
    }
  });
})();
