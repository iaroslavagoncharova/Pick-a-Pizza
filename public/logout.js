const logUserOut = () => {
    const logoutBtn = document.getElementById('logout-btn');

    logoutBtn?.addEventListener('click', async (e) => {
        e.preventDefault();

        if (localStorage.token && localStorage.user) {
          localStorage.clear();
          console.log({message: 'log out successful'});
          window.location.href = '/';
        } else {
          alert('log out failed');
        }

    })
};

export {logUserOut};