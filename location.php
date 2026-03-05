<?php $page_title = '오시는 길'; include 'header_sub.php'; ?>
            <nav class="sub-nav">
                <ul class="sub-nav__list">
                    <li><a href="/greeting.php">인사말</a></li>
                    <li><a href="/about.php">회사연혁</a></li>
                    <li><a href="/value01.php">핵심가치</a></li>
                    <li><a href="/location.php">오시는 길</a></li>
                </ul>
            </nav>
            <section class="yemat-map-section">
                <div class="inner">
                    <h4 class="map-title">OUR LOCATION</h4>
                    <div class="map-wrap">
                        <div id="daumRoughmapContainer1771336192102" class="root_daum_roughmap root_daum_roughmap_landing"></div>
                        <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
                        <script charset="UTF-8">
                            new daum.roughmap.Lander({
                                "timestamp" : "1771336192102",
                                "key" : "hj52bywab3k",
                                "mapWidth" : "640",
                                "mapHeight" : "360"
                            }).render();
                        </script>
                        <div class="map-info">
                            <strong>선홍수산식품</strong>
                            <p>경기 용인시 기흥구 한일로 49</p>
                            <a href="https://map.kakao.com/link/map/선홍수산식품,37.24693334549934,127.10217191317291" target="_blank" class="map-btn">
                                카카오맵 바로가기 →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
<?php include 'footer_sub.php'; ?>
