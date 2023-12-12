'use strict';

const fetchUsers = async (userId) => {
    const usersCont = document.getElementById('users-data');
    const userModal = document.getElementById('edit-users');
    const dialog = document.getElementById('edit-users-dialog');
    const usersHTML = [];

    const response = await fetch (`/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    console.log('fetchUsers reached');
    const users = await response.json();
    console.log('fetchUsers', typeof users);

    let userToDeleteId = null;

    for (let user of users.users) {

        // you can't see yourself here
        if (user.user_id === userId) continue;

        const thisUser = document.createElement('li');
        thisUser.classList.add('this-user');

        const userDiv = document.createElement('div');
        userDiv.classList.add('user-div');

        const userNameID = document.createElement('div');
        userNameID.classList.add('user-name-id');
        userNameID.innerHTML = '<h4 id="user-name-id">' + user.username + ' (ID: ' + user.user_id + ')</h4>';

        const userEmail = document.createElement('span');
        userEmail.innerHTML = '<b>Email:</b> ' + user.email + '<br>';

        const userAddress = document.createElement('span');
        userAddress.innerHTML ='<b>Address:</b> ' + user.address + '<br>';

        const userNumber = document.createElement('span');
        userNumber.innerHTML = '<b>Tel:</b> ' + user.phone_number + '<br>';

        const userCreation = document.createElement('span');
        const date = new Date(user.created_at).toLocaleDateString('fi');
        const hours = new Date(user.created_at).toLocaleTimeString('fi');
        userCreation.innerHTML = '<b>Created:</b> ' + date + ' ' + hours;

        const adminDiv = document.createElement('div');
        adminDiv.classList.add('admin-div');
        
        const adminIcon = document.createElement('img');
        adminIcon.src = '../images/icons/admin-icon.png';
        adminIcon.classList.add('top-nav-icon');
        adminIcon.classList.add('admin-icon');
        
        const adminText = document.createElement('h4');
        adminText.innerText = ' Administrator';

        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('user-icons-div');

        const msgIcon = document.createElement('img');
        msgIcon.src = '../images/icons/message-icon.png';
        msgIcon.classList.add('top-nav-icon');
        msgIcon.classList.add('edit-user-icon');
        msgIcon.classList.add('message-icon');
        msgIcon.title = 'Message user';
        iconsDiv.appendChild(msgIcon);

        const removeIcon = document.createElement('img');
        removeIcon.src = '../images/icons/trash-icon.png';
        removeIcon.classList.add('top-nav-icon');
        removeIcon.classList.add('edit-user-icon');
        removeIcon.classList.add('remove-icon');
        removeIcon.title = 'Remove user';

        adminDiv.appendChild(adminText);

        userDiv.appendChild(userNameID);
        if (user.user_level_id === 1) {
            adminDiv.appendChild(adminIcon);
            userDiv.appendChild(adminDiv);
        } else if (user.user_level_id === 2) {
            var adminBtn = adminIcon.cloneNode(true);
            adminBtn.classList.add('edit-user-icon');
            adminBtn.title = 'Grant administrator privileges';
            iconsDiv.appendChild(adminBtn);

            adminBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                const response = await fetch (`/users/grant-admin/${user.user_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({user_level_id: 1})
                });

                const data = await response.json();

                if (data.message === 'updated successfully') {
                    alert('user updated');
                    window.location.reload();
                } else {
                    alert('something went wrong!')
                }
            })
        };

        iconsDiv.appendChild(removeIcon);

        userDiv.appendChild(userEmail);
        userDiv.appendChild(userAddress);
        userDiv.appendChild(userNumber);
        userDiv.appendChild(userCreation);
        userDiv.appendChild(iconsDiv);
        thisUser.appendChild(userDiv);
        usersHTML.push(thisUser);
        userModal.appendChild(thisUser);

        // event listeners

        const msgPopup = document.getElementById('message-user');
        const cancelMsgBtn = document.querySelector('#cancel-msg');
        const confirmMsgBtn = document.querySelector('#confirm-msg');

        msgIcon.addEventListener('click', () => {
            const msgUsrname = document.getElementById('msg-username');
            msgUsrname.innerText = user.username;

            msgPopup.classList.remove('hidden');
            msgPopup.classList.add('open-popup');
            dialog.classList.add('blur-background');

        });

        cancelMsgBtn.addEventListener('click', () => {
            msgPopup.classList.remove('open-popup');
            msgPopup.classList.add('hidden');
            dialog.classList.remove('blur-background');
        })

        confirmMsgBtn.addEventListener('click', () => {
            msgPopup.classList.remove('open-popup');
            msgPopup.classList.add('hidden');
            dialog.classList.remove('blur-background');
        });

        const deletePopup = document.getElementById('confirm-deletion');
        const cancelDeleteBtn = deletePopup.querySelector('#cancel-delete');
        const confirmDeleteBtn = deletePopup.querySelector('#confirm-delete');

        removeIcon.addEventListener('click', () => {
            userToDeleteId = user.user_id;
            deletePopup.classList.remove('hidden');
            deletePopup.classList.add('open-popup');
            dialog.classList.add('blur-background');
        });

        cancelDeleteBtn.addEventListener('click', () => {
            userToDeleteId = null;
            deletePopup.classList.remove('open-popup');
            deletePopup.classList.add('hidden');
            dialog.classList.remove('blur-background');
        });
        
        confirmDeleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (userToDeleteId != null) {
                const response = await fetch (`/users/delete/${userToDeleteId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            
            
                if (response.status === 204) {
                    alert('Account deletion successful.')
                    window.location.reload();
                } else {
                    alert("couldn't delete account!");
                };

                userToDeleteId = null;
                deletePopup.classList.remove('open-popup');
                deletePopup.classList.add('hidden');
                dialog.classList.remove('blur-background');
            } else {
                alert('No user selected for deletion!');
            }
            
        });

    };

    const firstUser = usersHTML[0].cloneNode(true);
    firstUser.querySelector('.user-icons-div').remove();

    if (firstUser.querySelector('.admin-div') !== null) {
        firstUser.querySelector('.admin-div').remove();
    }
    usersCont.appendChild(firstUser);
};

export default fetchUsers;