export const checkDevice = () => {
    const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints);
    if (isTouchDevice) {
    function toggleMobileMenu() {
        const dropdown = document.getElementById('bottom-nav-items');
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        }
      const mobileMenuButton = document.getElementById('mobile-menu-icon');
      mobileMenuButton.addEventListener('click', toggleMobileMenu);
      const openMenu = document.getElementById('menu');
      const dropdownContent = document.getElementById('menu-dropdown');
      openMenu.addEventListener('click', (event) => {
          event.preventDefault();
          dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
      });
  
      const openPrompts = document.getElementById('prompts');
      const dropdownPrompts = document.getElementById('pizza-dropdown');
      openPrompts.addEventListener('click', (event) => {
          event.preventDefault();
          dropdownPrompts.style.display = dropdownPrompts.style.display === 'flex' ? 'none' : 'flex';
      });
  }
};
