const updateOther = document.getElementById('update-user-data');
const updatePassword = document.getElementById('change-password');

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const userId = user.user_id;

updateOther.addEventListener('submit', async (e) => {
    e.preventDefault();

    let username = document.getElementById('change-username').value || user.username;
    let email = document.getElementById('change-email').value || user.email;
    let address = document.getElementById('change-address').value || user.address;
    let number = document.getElementById('change-number').value || user.phone_number;

    const response = await fetch ('/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, username: username, email: email, address: address, phone_number: number}),
    });

    const data = await response.json();

    if (data.message === 'updated successfully') {
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location.reload();
    } else {
        alert('something went wrong!')
    }
});

updatePassword.addEventListener('submit', async (e) => {
    e.preventDefault();

    let currentPassword = document.getElementById('current-password').value;
    let newPswd1 = document.getElementById('new-password').value;
    let newPswd2 = document.getElementById('new-password2').value;

    if (currentPassword === '' || newPswd1 === '' || newPswd2 === '') {
        alert('Please fill all input fields.');
    } else if (newPswd1 != newPswd2) {
        alert('New password values do not match.');
        window.location.reload();
    } else {
        const response = await fetch ('/update/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, password: currentPassword, new_password: newPswd1}),
        });

        const data = await response.json();

        if (data.message === 'password updated successfully') {
            alert('Password update successful. Logging out...');
            localStorage.clear();
            window.location.href = '/';
        } else {
            alert(data.error);
            window.location.reload();
        }
    }
})