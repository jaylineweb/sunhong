<?php
$page_title = '핵심가치';
include 'header_sub.php';
?>
            <nav class="sub-nav">
                <ul class="sub-nav__list">
                    <li><a href="/greeting.php">인사말</a></li>
                    <li><a href="/about.php">회사연혁</a></li>
                    <li><a href="/value01.php">핵심가치</a></li>
                    <li><a href="/location.php">오시는 길</a></li>
                </ul>
            </nav>
            <section class="brand-visual">
                <div class="overlay"></div>
                <div class="inner">
                    <h2>
                        선홍수산식품은 깨끗한 바다의 가치를 <br>
                        담아 신뢰할 수 있는 건어물 문화를 만들어 갑니다.
                    </h2>
                </div>
            </section>
<?php
$html = file_get_contents(__DIR__ . '/value01.html');
$start = strpos($html, '<div class="core-values">');
$end = strpos($html, '</main>', $start);
if ($start !== false && $end !== false) {
    echo substr($html, $start, $end - $start);
}
include 'footer_sub.php';
