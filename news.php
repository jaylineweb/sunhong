<?php
$page_title = '보도자료';
include 'header_sub.php';
$h = file_get_contents(__DIR__ . '/news.html');
$s = strpos($h, '<main class="main">');
$s = $s !== false ? strpos($h, '>', $s) + 1 : 0;
$e = strpos($h, '</main>', $s);
if ($s && $e) echo substr($h, $s, $e - $s);
include 'footer_sub.php';
