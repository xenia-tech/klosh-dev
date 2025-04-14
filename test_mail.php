<?php
if (mail('martin@klosh.co.uk', 'Test Email', 'This is a test email.')) {
    echo 'Mail sent successfully.';
} else {
    echo 'Mail sending failed.';
}
?>