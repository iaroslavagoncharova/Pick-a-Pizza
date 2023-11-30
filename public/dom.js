
const addUserDataToDom = (user) => {
    console.log('addUserDataToDom', user);
    const container = document.getElementById('bottom-nav-items');
    const loginIcon = document.getElementById('login-icon');
    loginIcon.remove();

    const userOptions = document.createElement('div');
    userOptions.id = 'user-options';
    userOptions.classList.add('dropdown');

    const listItem = document.createElement('li');
    
    const textCont = document.createElement('p');

    const userEmail = document.createElement('span');
    userEmail.id = 'user-email';
    userEmail.innerText = user.email;

    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');
    dropdownContent.id = 'user-dropdown';

    const userAccount = document.createElement('a');
    userAccount.href = '/my-account';
    userAccount.classList.add('dropdown-link');
    userAccount.id = 'user-account';
    userAccount.innerText = 'My Account';

    const logout = document.createElement('a');
    logout.classList.add('dropdown-link');
    logout.id = 'logout-link';

    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.innerText = 'Log out';

    dropdownContent.appendChild(userAccount);

    logout.appendChild(logoutBtn);
    dropdownContent.appendChild(logout);

    textCont.appendChild(userEmail);
    listItem.appendChild(textCont);

    userOptions.appendChild(listItem);
    userOptions.appendChild(dropdownContent);

    container.appendChild(userOptions);
};

const removeUserDataFromDom = () => {
    const container = document.getElementById('bottom-nav-items');
    const userOptions = document.getElementById('user-options');

    if (userOptions) {
        userOptions.remove();

        const listItem = document.createElement('li');
        listItem.id = 'login-icon';
    
        const redirect = document.createElement('a');
        redirect.href = '/sign-in';
    
        const userIcon = document.createElement('img');
        userIcon.classList.add('bottom-nav-icon');
        userIcon.id = 'user-icon';
        userIcon.src = '../images/icons/user-icon.png';
        userIcon.alt = 'User Icon';
    
        redirect.appendChild(userIcon);
        listItem.appendChild(redirect);
        container.appendChild(listItem);
    }
};

export {addUserDataToDom, removeUserDataFromDom};