'use strict'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('job-application-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from actually submitting

    
        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.textContent = 'Your job application has been submitted! We will contact you soon.';
    });
});
