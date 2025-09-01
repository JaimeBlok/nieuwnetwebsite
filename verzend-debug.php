<?php
// Debug versie van verzend.php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Capture all errors
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

$debug_info = [
    'php_version' => phpversion(),
    'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN',
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'UNKNOWN',
    'post_data' => $_POST,
    'raw_input' => file_get_contents('php://input'),
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'UNKNOWN'
];

try {
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        throw new Exception("Only POST method allowed");
    }

    // Check if we have any POST data
    if (empty($_POST)) {
        $raw_input = file_get_contents('php://input');
        if (!empty($raw_input)) {
            parse_str($raw_input, $_POST);
            $debug_info['parsed_input'] = $_POST;
        }
    }

    if (empty($_POST)) {
        throw new Exception("No POST data received");
    }

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        throw new Exception("Missing required fields");
    }

    // Test mail function
    if (!function_exists('mail')) {
        throw new Exception("Mail function not available on this server");
    }

    $to = "contact@nieuw-net.nl";
    $email_subject = "TEST - Contactformulier: " . $subject;
    $email_body = "TEST EMAIL\n\nNaam: $name\nEmail: $email\nBericht: $message";
    $headers = "From: noreply@nieuw-net.nl\r\nReply-To: $email";

    $mail_result = mail($to, $email_subject, $email_body, $headers);

    echo json_encode([
        'status' => 'success',
        'message' => 'Email ' . ($mail_result ? 'verzonden' : 'NIET verzonden'),
        'mail_result' => $mail_result,
        'debug' => $debug_info
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'debug' => $debug_info
    ]);
}
?>
