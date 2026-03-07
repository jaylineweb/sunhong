            <footer class="site-footer">
                <div class="site-footer__inner">
                    <!-- 로고 -->
                    <div class="site-footer__logo">
                        <img src="./images/common/footer_logo.png" alt="sunhong footer logo">
                    </div>
                    <!-- 회사 정보 -->
                    <address class="site-footer__company">
                        <p>주소: 17099 경기도 용인시 기흥구 한일로 49 (공세동) 좋은만남</p>
                        <p>사업자등록번호: 142-04-13490</p>
                        <p>통신판매사업자번호: 제 2024-용인기흥-2746 호</p>
                        <p>개인정보관리책임자: <span class="privacy-officer-name notranslate">윤현우</span></p>
                    </address>
                    <!-- 사이트맵 -->
                    <nav class="site-footer__nav">
                        <strong>사이트맵</strong>
                        <ul>
                            <li><a href="/about.php">회사소개</a></li>
                            <li><a href="/value01.php">핵심가치</a></li>
                            <li><a href="/product.php">제품소개</a></li>
                            <li><a href="/recruit.php">인재채용</a></li>
                        </ul>
                    </nav>
                    <!-- 약관 -->
                    <div class="site-footer__policy">
                        <a href="https://yemat.com/?mode=policy">이용약관</a>
                        <a href="?mode=privacy"><strong>개인정보처리방침</strong></a>
                    </div>
                    <!-- 연락처 -->
                    <div class="site-footer__contact">
                        <a href="mailto:sales@yemat1004.com">
                            <img src="https://cdn.imweb.me/upload/S202402287f0c8739e1cc6/a627b60a5e4b9.png" alt="">
                            <strong>sunhong198@hotmail.com</strong>
                        </a>
                        <a href="tel:07044847200">
                            <img src="https://cdn.imweb.me/upload/S202402287f0c8739e1cc6/0061ce1c301c9.png" alt="">
                            <strong>031-287-3431</strong>
                        </a>
                        <a href="/contact.php" class="site-footer__cta">
                            제안 · 협업 · 상품문의
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    </div>
    <!-- Google Translate (숨김 처리, CN/JP/EN 클릭 시 쿠키로 언어 전환) -->
    <div id="google_translate_element" class="sr-only" aria-hidden="true"></div>
    <script src="./js/script.js"></script>
    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script>
      // 제품 리스트: 640px 이하에서만 Slick 슬라이더 적용
      (function () {
        var MOBILE_BREAKPOINT = 768;
        var $list = $('.products__list');
        var slickInited = false;

        function initProductsSlick() {
          if ($list.length && !slickInited && window.innerWidth <= MOBILE_BREAKPOINT) {
            $list.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
              centerMode: true,
              swipe: true,
              draggable: true,
              autoplay: true,
              arrows: false,
              dots: true,
              infinite: true
            });
            slickInited = true;
          }
        }

        function destroyProductsSlick() {
          if ($list.length && slickInited && window.innerWidth > MOBILE_BREAKPOINT) {
            $list.slick('unslick');
            slickInited = false;
          }
        }

        function checkProductsSlick() {
          if (window.innerWidth <= MOBILE_BREAKPOINT) {
            initProductsSlick();
          } else {
            destroyProductsSlick();
          }
        }

        $(function () {
          checkProductsSlick();
          $(window).on('resize', checkProductsSlick);
        });
      })();
    </script>
</body>
</html>
