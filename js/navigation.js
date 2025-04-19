// js/navigation.js

export function initNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const menuList = document.getElementById('menuList');
    console.log('initNavigation called', menuBtn, menuList); // Debugging line
 
  // Обработчик для кнопки меню
  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', () => {
      menuList.classList.toggle('open');
      console.log('Menu button clicked, toggling menu'); // Debugging line
    });
  }

  // Обработчик для кликов на пункты меню
  const links = document.querySelectorAll('.nav-menu a'); // Все ссылки в меню
  const sections = document.querySelectorAll('section'); // Все секции на странице

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.dataset.section; // Получаем id секции из атрибута data-section
      console.log(`Link clicked: ${targetId}`); // Для отладки
      sections.forEach(sec => sec.style.display = 'none'); // Скрываем все секции

      // Показываем нужную секцию
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = 'block'; // Показываем нужную секцию
      }
    });
  });
}

