<?php
$page_title = '문의하기';

// 문의 접수 시 받을 이메일 (필요 시 수정)
$admin_email = 'jayremind2@naver.com';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $company     = isset($_POST['company'])     ? trim($_POST['company'])     : '';
    $contact_info= isset($_POST['contact_info'])? trim($_POST['contact_info']): '';
    $phone       = isset($_POST['phone'])       ? trim($_POST['phone'])       : '';
    $email       = isset($_POST['email'])       ? trim($_POST['email'])       : '';
    $message     = isset($_POST['message'])     ? trim($_POST['message'])     : '';
    $privacy     = isset($_POST['privacy_agree']);

    $errors = [];
    if ($company === '') $errors[] = '회사명을 입력해 주세요.';
    if ($contact_info === '') $errors[] = '담당자 성함/부서명/직함을 입력해 주세요.';
    if ($phone === '') $errors[] = '연락처를 입력해 주세요.';
    if ($email === '') $errors[] = '이메일을 입력해 주세요.';
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = '올바른 이메일 주소를 입력해 주세요.';
    if ($message === '') $errors[] = '문의 내용을 입력해 주세요.';
    if (!$privacy) $errors[] = '개인정보 수집 및 이용에 동의해 주세요.';

    if (empty($errors)) {
        $subject = '[선홍수산 문의] ' . mb_substr($company, 0, 20) . ' - ' . date('Y-m-d H:i');
        $body = "다음과 같이 문의가 접수되었습니다.\n\n";
        $body .= "회사명: " . $company . "\n";
        $body .= "담당자(부서/직함): " . $contact_info . "\n";
        $body .= "연락처: " . $phone . "\n";
        $body .= "이메일: " . $email . "\n\n";
        $body .= "문의 내용:\n" . $message . "\n";

        $headers = [
            'From: ' . $admin_email,
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Type: text/plain; charset=UTF-8',
            'MIME-Version: 1.0',
        ];
        $sent = @mail($admin_email, $subject, $body, implode("\r\n", $headers));

        if ($sent) {
            header('Location: contact.php?sent=1');
            exit;
        }
        $errors[] = '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    }
}

include 'header_sub.php';

if (!empty($errors)) {
    echo '<div class="inner" style="margin-bottom:1rem;"><p class="contact-error" style="color:#c00; padding:1rem; border:1px solid #c00;">' . implode('<br>', array_map('htmlspecialchars', $errors)) . '</p></div>';
}

$h = file_get_contents(__DIR__ . '/contact.html');
$s = strpos($h, '<main class="main">');
$s = $s !== false ? strpos($h, '>', $s) + 1 : 0;
$e = strpos($h, '</main>', $s);
if ($s && $e) {
    $main = substr($h, $s, $e - $s);
    if (isset($_GET['sent']) && $_GET['sent'] == '1') {
        $main = '<div class="inner" style="margin-bottom:1.5rem;"><p class="contact-success" style="color:#0a0; padding:1rem; border:1px solid #0a0; font-weight:bold;">문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.</p></div>' . $main;
    }
    // POST 후 검증 실패 시 입력값 유지
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($errors)) {
        $main = str_replace('name="company" required', 'name="company" value="' . htmlspecialchars($company ?? '') . '" required', $main);
        $main = str_replace('name="contact_info" required', 'name="contact_info" value="' . htmlspecialchars($contact_info ?? '') . '" required', $main);
        $main = str_replace('name="phone" required', 'name="phone" value="' . htmlspecialchars($phone ?? '') . '" required', $main);
        $main = str_replace('name="email" required', 'name="email" value="' . htmlspecialchars($email ?? '') . '" required', $main);
        $limit = 1;
        $main = str_replace('</textarea>', htmlspecialchars($message ?? '') . '</textarea>', $main, $limit);
    }
    echo $main;
}
include 'footer_sub.php';
