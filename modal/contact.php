<?php
// Configuration
$config = [
    'success_message' => "Your message has been sent successfully. We will contact you soon.",
    'error_message' => "Sorry, there was an error sending your message. Please try again later."
];

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
    exit;
}

// Get form data
$name = isset($_POST['ajax_name']) ? trim($_POST['ajax_name']) : '';
$email = isset($_POST['ajax_email']) ? trim($_POST['ajax_email']) : '';
$message = isset($_POST['ajax_message']) ? trim($_POST['ajax_message']) : '';

// Validate inputs
if (empty($name)) {
    $response['errors'][] = 'Name is required';
}

if (empty($email)) {
    $response['errors'][] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['errors'][] = 'Please enter a valid email address';
}

if (empty($message)) {
    $response['errors'][] = 'Message is required';
}

// If validation fails, return errors
if (!empty($response['errors'])) {
    $response['message'] = $response['errors'][0]; // Return first error as main message
    echo json_encode($response);
    exit;
}

// Return response
$response['success'] = true;
$response['message'] = $config['success_message'];

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>