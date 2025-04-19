// js/navigation.js

export function initNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const menuList = document.getElementById('menuList');
    console.log('initNavigation called', menuBtn, menuList); // Debugging line
    if (menuBtn && menuList) {
      menuBtn.addEventListener('click', () => {
        menuList.classList.toggle('open');
              console.log('Menu button clicked, toggling menu'); // Debugging line
      });
    }
}

