<?php

// Put contacting email here
$php_main_email = "hello@klosh.dev";

//Fetching Values from URL
$php_name = $_POST['ajax_name'];
$php_email = $_POST['ajax_email'];
$php_message = $_POST['ajax_message'];



//Sanitizing email
$php_email = filter_var($php_email, FILTER_SANITIZE_EMAIL);


//After sanitization Validation is performed
if (filter_var($php_email, FILTER_VALIDATE_EMAIL)) {
	
	
		$php_subject = "Message from Klosh website contact form";
		
		// To send HTML mail, the Content-type header must be set
		$php_headers = 'MIME-Version: 1.0' . "\r\n";
		$php_headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$php_headers .= 'From:' . $php_email. "\r\n"; // Sender's Email
		$php_headers .= 'Reply-To:' . $php_email. "\r\n"; // Reply to Sender
		
		$php_template = '<div style="padding:50px; font-family: Arial, sans-serif;">Hello,<br/><br/>'
		. 'You have received a new message from the Klosh website contact form.<br/><br/>'
		. '<strong style="color:#333;">Name:</strong> ' . htmlspecialchars($php_name) . '<br/>'
		. '<strong style="color:#333;">Email:</strong> ' . htmlspecialchars($php_email) . '<br/>'
		. '<strong style="color:#333;">Message:</strong> ' . nl2br(htmlspecialchars($php_message)) . '<br/><br/>'
		. 'This email was sent from your website contact form.'
		. '</div>';
		$php_sendmessage = "<div style=\"background-color:#f5f5f5; color:#333;\">" . $php_template . "</div>";
		
		// message lines should not exceed 70 characters (PHP rule), so wrap it
		$php_sendmessage = wordwrap($php_sendmessage, 70);
		
		// Send mail by PHP Mail Function
		$mail_sent = mail($php_main_email, $php_subject, $php_sendmessage, $php_headers);
		
		if($mail_sent) {
		    echo "";
		} else {
		    echo "<span class='contact_error'>* Server error: Unable to send email *</span>";
		}
	
	
} else {
	echo "<span class='contact_error'>* Invalid email address *</span>";
}

?>