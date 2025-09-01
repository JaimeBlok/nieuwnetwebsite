<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'PHP werkt correct!',
    'php_version' => phpversion(),
    'server_info' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
