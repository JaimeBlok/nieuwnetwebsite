<?php
// Zet content-type header vroeg
header('Content-Type: application/json; charset=utf-8');

// Enable error reporting voor debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log functie
function debug_log($message) {
    error_log(date('Y-m-d H:i:s') . " - " . $message);
}

debug_log("verzend.php aangeroepen");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Only POST method allowed']);
    exit;
}

function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function is_spam($content) {
    $spam_keywords = ['viagra', 'cialis', 'loan', 'casino', 'poker', 'bitcoin', 'crypto'];
    $content_lower = strtolower($content);
    
    foreach ($spam_keywords as $keyword) {
        if (strpos($content_lower, $keyword) !== false) {
            return true;
        }
    }
    
    if (substr_count($content, 'http') > 3) {
        return true;
    }
    
    return false;
}

$errors = [];

$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$company = isset($_POST['company']) ? sanitize_input($_POST['company']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

debug_log("Ontvangen data: naam=$name, email=$email, onderwerp=$subject");

if (empty($name) || strlen($name) < 2) {
    $errors[] = "Naam is verplicht en moet minimaal 2 karakters bevatten.";
}

if (empty($email) || !validate_email($email)) {
    $errors[] = "Een geldig e-mailadres is verplicht.";
}

if (empty($subject) || strlen($subject) < 3) {
    $errors[] = "Onderwerp is verplicht en moet minimaal 3 karakters bevatten.";
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = "Bericht is verplicht en moet minimaal 10 karakters bevatten.";
}

if (is_spam($message) || is_spam($subject)) {
    $errors[] = "Uw bericht bevat verdachte content en kan niet worden verzonden.";
}

if (!empty($errors)) {
    debug_log("Validatie fouten: " . implode(', ', $errors));
    http_response_code(400);
    echo json_encode(['status' => 'error', 'errors' => $errors]);
    exit;
}

$to = "contact@nieuw-net.nl";
$email_subject = "Contactformulier nieuw-net.nl: " . $subject;

$email_body = "Nieuwe contactaanvraag via nieuw-net.nl\n";
$email_body .= "=========================================\n\n";
$email_body .= "CONTACTGEGEVENS:\n";
$email_body .= "Naam: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Telefoon: " . ($phone ?: 'Niet opgegeven') . "\n";
$email_body .= "Bedrijf: " . ($company ?: 'Niet opgegeven') . "\n";
$email_body .= "Onderwerp: " . $subject . "\n\n";
$email_body .= "BERICHT:\n";
$email_body .= "=========================================\n";
$email_body .= $message . "\n\n";
$email_body .= "=========================================\n";
$email_body .= "Website: nieuw-net.nl\n";
$email_body .= "Verzonden: " . date('d-m-Y H:i:s') . "\n";
$email_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Eenvoudigere headers voor TransIP
$headers = "From: nieuw-net.nl <noreply@nieuw-net.nl>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

debug_log("Proberen email te versturen naar: $to");

if (mail($to, $email_subject, $email_body, $headers)) {
    debug_log("Email succesvol verzonden");
    echo json_encode([
        'status' => 'success',
        'message' => 'Email succesvol verzonden'
    ]);
} else {
    debug_log("Email verzending mislukt");
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Email verzending mislukt. Controleer server configuratie.'
    ]);
}
?>
