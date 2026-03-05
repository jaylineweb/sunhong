<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>선홍수산</title>
    <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="./css/main.css" />
    <!-- Slick (모바일 제품 슬라이더용) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.min.css" />
</head>

<body>

    <div class="wrapper">
        <header class="header">
            <div class="header-inner">
                <!-- 모바일 메뉴 버튼 -->
                <button type="button" class="btn-menu" aria-label="메뉴 열기" aria-expanded="false">
                    <span class="ham"><span></span><span></span><span></span></span>
                </button>
                <!-- Logo -->
                <h1 class="logo">
                    <a href="/">
                        <img src="./images/common/logo.png" alt="예맛 YEMAT">
                    </a>
                </h1>
                <!-- GNB (데스크톱) -->
                <nav class="gnb">
                    <ul class="gnb-list">
                        <li class="gnb-item has-dropdown">
                            <a href="/greeting.php" class="gnb-link">회사소개</a>
                            <ul class="depth2">
                                <li><a href="/greeting.php">인사말</a></li>
                                <li><a href="/about.php">회사연혁</a></li>
                                <li><a href="/value01.php">핵심가치</a></li>
                                <li><a href="/location.php">오시는 길</a></li>
                            </ul>
                        </li>
                        <li class="gnb-item has-dropdown">
                            <a href="/value.php" class="gnb-link">품질경영</a>
                            <ul class="depth2">
                                <li><a href="/value.php">품질 시스템</a></li>
                                <li><a href="/factory.php">생산 시스템</a></li>
                                <li><a href="/certificate.php">품질검사 및 인증</a></li>
                            </ul>
                        </li>
                        <li class="gnb-item has-dropdown">
                            <a href="/product.php" class="gnb-link">제품소개</a>
                            <ul class="depth2">
                                <li><a href="/product.php">제품소개</a></li>
                                <li><a href="/partner.php">주요 고객사</a></li>
                            </ul>
                        </li>
                        <li class="gnb-item">
                            <a href="/recruit.php" class="gnb-link">인재채용</a>
                        </li>
                    </ul>
                    <div class="gnb_contact">
                        <a href="/contact.php" class="btn-primary">문의하기</a>
                    </div>
                </nav>
                <!-- Language -->
                <div class="language">
                    <div class="language-inner">
                        <span class="taegukgi-icon">
                            <img class="lang-flag" src="./common/img/flag_shapes/flag_kr_circle.png" alt="한국어" data-src-ko="./common/img/flag_shapes/flag_kr_circle.png" data-src-zh="./common/img/flag_shapes/flag_CN_circle.png" data-src-ja="./common/img/flag_shapes/flag_jp_circle.png" data-src-en="./common/img/flag_shapes/flag_en_circle.png">
                        </span>
                        <button class="lang-btn">
                            KR ▾
                        </button>
                    </div>
                    <ul class="lang-dropdown">
                        <li><a href="/" data-lang="ko">KR</a></li>
                        <li><a href="#" data-lang="zh-CN">CN</a></li>
                        <li><a href="#" data-lang="ja">JP</a></li>
                        <li><a href="#" data-lang="en">EN</a></li>
                    </ul>
                </div>

                <!-- 모바일 메뉴 오버레이 -->
                <div class="gnb-overlay" aria-hidden="true"></div>
                <!-- 모바일 메뉴 닫기 (GNB 우측 바깥) -->
                <button type="button" class="btn-close" aria-label="메뉴 닫기">×</button>
                <!-- 모바일 메뉴 드로어 -->
                <div class="gnb-drawer">
                    <nav class="gnb-mobile">
                        <ul class="gnb-list">
                            <li class="gnb-item has-dropdown">
                                <a href="/greeting.php" class="gnb-link">회사소개<span class="arrow" aria-hidden="true"></span></a>
                                <ul class="depth2">
                                    <li><a href="/greeting.php">인사말</a></li>
                                    <li><a href="/about.php">회사연혁</a></li>
                                    <li><a href="/value01.php">핵심가치</a></li>
                                    <li><a href="/location.php">오시는 길</a></li>
                                    <!--<li><a href="/pr_video.php">홍보영상</a></li>
                                    <li><a href="/news.php">보도자료</a></li>
                                    <li><a href="/family.php">관계사 소개</a></li>-->
                                </ul>
                            </li>
                            <li class="gnb-item has-dropdown">
                                <a href="/value.php" class="gnb-link">품질 경영<span class="arrow" aria-hidden="true"></span></a>
                                <ul class="depth2">
                                    <li><a href="/value.php">품질 시스템</a></li>
                                    <li><a href="/factory.php">생산 시스템</a></li>
                                    <li><a href="/certificate.php">품질검사 및 인증</a></li>
                                </ul>
                            </li>
                            <li class="gnb-item has-dropdown">
                                <a href="/product.php" class="gnb-link">제품소개<span class="arrow" aria-hidden="true"></span></a>
                                <ul class="depth2">
                                    <li><a href="/product.php">제품소개</a></li>
                                    <li><a href="/partner.php">주요 고객사</a></li>
                                </ul>
                            </li>
                            <li class="gnb-item">
                                <a href="/recruit.php" class="gnb-link">인재채용</a>
                            </li>
                        </ul>
                        <div class="language mobile">
                            <div class="language-inner">
                                <button class="lang-btn"><span class="lang-btn-text">KR</span><span class="arrow" aria-hidden="true"></span></button>
                            </div>
                            <ul class="lang-dropdown">
                                <li><a href="/" data-lang="ko">KR</a></li>
                                <li><a href="#" data-lang="zh-CN">CN</a></li>
                                <li><a href="#" data-lang="ja">JP</a></li>
                                <li><a href="#" data-lang="en">EN</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>
        </header>
