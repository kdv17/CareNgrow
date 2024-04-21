document.addEventListener('DOMContentLoaded', function() {
    // Change Password Form
    const changePasswordForm = document.getElementById('changePasswordForm');
    changePasswordForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        // Validate currentPassword and newPassword
        if (currentPassword.trim() === '' || newPassword.trim() === '') {
            alert('Please enter both current and new passwords.');
            return;
        }
        // Submit the form if validation passes
        changePasswordForm.submit();
    });

    // Change Username Form
    const changeUsernameForm = document.getElementById('changeUsernameForm');
    changeUsernameForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const newUsername = document.getElementById('newUsername').value;
        // Validate newUsername
        if (newUsername.trim() === '') {
            alert('Please enter a new username.');
            return;
        }
        // Submit the form if validation passes
        changeUsernameForm.submit();
    });

    // Delete Account Form
    const deleteAccountForm = document.getElementById('deleteAccountForm');
    deleteAccountForm.addEventListener('submit', function(event) {
        // Display confirmation dialog before form submission
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            event.preventDefault(); // Prevent form submission
        }
    });
});

