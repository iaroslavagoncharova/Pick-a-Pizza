import { addUserDataToDom, removeUserDataFromDom } from './dom.js';
import { logUserOut } from './logout.js';

const onCommonReload = () => {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, token);

    if (token&&user) {
        addUserDataToDom(user);
        logUserOut();
        const userButton = document.getElementById('user-account');
        if (user.user_level_id === 1) {
        userButton.href = '/my-account/admin';
        } else if (user.user_level_id === 2) {
        userButton.href = '/my-account';
        }
    } else {
        removeUserDataFromDom();
    }
};

export default onCommonReload;