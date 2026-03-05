<?php $page_title = '품질검사 및 인증'; include 'header_sub.php'; ?>
            <nav class="sub-nav">
                <ul class="sub-nav__list">
                    <li><a href="/value.php">품질 시스템</a></li>
                    <li><a href="/factory.php">생산 시스템</a></li>
                    <li><a href="/certificate.php">품질검사 및 인증</a></li>
                </ul>
            </nav>
            <section class="cert-hero">
                <div class="inner">
                    <h6>
                        선홍수산은 엄격하고 체계적인 위생 관리 시스템과 함께,<br>
                        국내외 식품 인증을 획득했습니다.
                    </h6>
                </div>
            </section>
            <section class="cert-section">
                <div class="inner">
                    <h2 class="certi_title">인증마크</h2>
                    <ul class="cert-grid">
                        <li><img src="./images/sub/mark_fda.png" alt="fda"></li>
                        <li><img src="./images/sub/mark_haccp.png" alt="haccp"></li>
                        <li><img src="./images/sub/mark_bureau.png" alt="bureau"></li>
                    </ul>
                </div>
            </section>
            <section class="certificate">
                <h2 class="certi_title">인증서</h2>
                <div class="inner">
                    <div class="certificate_list">
                        <div class="certificate_item">
                            <div class="certificate_title">&lt;FDA등록증&gt;</div>
                            <div class="certificate_imagebox" role="button" tabindex="0" aria-label="FDA등록증 보기">
                                <img src="./images/sub/certificate_img01.png" alt="FDA등록증">
                            </div>
                        </div>
                        <div class="certificate_item">
                            <div class="certificate_title">&lt;HACCP인증서 국문&gt;</div>
                            <div class="certificate_imagebox" role="button" tabindex="0" aria-label="HACCP인증서 국문 보기">
                                <img src="./images/sub/certificate_img02.png" alt="HACCP인증서 국문">
                            </div>
                        </div>
                        <div class="certificate_item">
                            <div class="certificate_title">&lt;HACCP인증서 영문&gt;</div>
                            <div class="certificate_imagebox" role="button" tabindex="0" aria-label="HACCP인증서 영문 보기">
                                <img src="./images/sub/certificate_img03.png" alt="HACCP인증서 영문">
                            </div>
                        </div>
                        <div class="certificate_item">
                            <div class="certificate_title">&lt;한국뷰로베리타스 홈플러스 시험성적서&gt;</div>
                            <div class="certificate_imagebox" role="button" tabindex="0" aria-label="한국뷰로베리타스 홈플러스 시험성적서 보기">
                                <img src="./images/sub/certificate_img04.png" alt="한국뷰로베리타스 홈플러스 시험성적서">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="certificate-lightbox" id="certificateLightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="인증서 보기">
                <div class="certificate-lightbox__overlay"></div>
                <div class="certificate-lightbox__inner">
                    <button type="button" class="certificate-lightbox__close" aria-label="닫기">×</button>
                    <button type="button" class="certificate-lightbox__prev" aria-label="이전">‹</button>
                    <button type="button" class="certificate-lightbox__next" aria-label="다음">›</button>
                    <div class="certificate-lightbox__content">
                        <img src="" alt="" class="certificate-lightbox__img">
                        <p class="certificate-lightbox__caption"></p>
                    </div>
                </div>
            </div>
<?php include 'footer_sub.php'; ?>
