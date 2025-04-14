<?php
// Configuration
$config = [
    'recipient_email' => "hello@klosh.dev",
    'subject' => "Message from Klosh website contact form",
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

// Prepare email
$to = $config['recipient_email'];
$subject = $config['subject'];

// Create email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Create email template
$email_template = '
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
        .header { background-color: #000; color: #fff; padding: 10px 20px; }
        .content { padding: 20px; }
        .footer { background-color: #f5f5f5; padding: 10px 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <p>You have received a new message from the Klosh website contact form.</p>
            <p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>
            <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>
            <p><strong>Message:</strong></p>
            <p>' . nl2br(htmlspecialchars($message)) . '</p>
        </div>
        <div class="footer">
            <p>This email was sent from your website contact form on ' . date('F j, Y, g:i a') . '</p>
        </div>
    </div>
</body>
</html>
';

// Send email
$mail_sent = mail($to, $subject, $email_template, implode("\r\n", $headers));

// Return response
if ($mail_sent) {
    $response['success'] = true;
    $response['message'] = $config['success_message'];
} else {
    $response['message'] = $config['error_message'];
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>