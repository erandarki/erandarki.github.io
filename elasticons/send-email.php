<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // 1. Check Honeypot
  if (!empty($_POST['_honey'])) {
      exit; // It's a bot
  }

  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $subject = htmlspecialchars($_POST['subject']);
  $message = htmlspecialchars($_POST['message']);
  $to = "contact@elasticons.com";

  // Basic PHP mail (Upgrade to PHPMailer for production)
  $headers = "From: contact@elasticons.com" . "\r\n" .
              "Reply-To: " . $email . "\r\n" .
              "X-Mailer: PHP/" . phpversion();
  
  $full_message = "From: $email\nSubject: $subject\n\n$message";

  if (mail($to, "Contact Form: $subject", $full_message, $headers)) {
      echo json_encode(['status' => 'success']);
  } else {
      echo json_encode(['status' => 'error', 'message' => 'Server failed to send email.']);
  }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>