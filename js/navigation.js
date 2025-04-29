export function initNavigation() {
  const menuBtn = document.getElementById('menuBtn'); // Кнопка меню
  const menuList = document.getElementById('menuList'); // Список меню

  // Обработчик для кнопки меню
  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', () => {
      menuList.classList.toggle('open'); // Открываем/закрываем меню
      menuBtn.classList.toggle('open'); // для визуализации кнопки
    });
  }

  // Обработчик для кликов на пункты меню
  const links = document.querySelectorAll('.nav-menu a'); // Все ссылки в меню
  const sections = document.querySelectorAll('section'); // Все секции на странице

  // Получаем все ссылки в меню
  links.forEach((link) => {
    // Добавляем обработчик клика на каждую ссылку
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.dataset.section; // Получаем id секции из атрибута data-section
      sections.forEach((sec) => (sec.style.display = 'none')); // Скрываем все секции

      // Показываем нужную секцию
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = 'block';
      }

      // Закрываем меню после клика
      menuList.classList.remove('open');
      menuBtn.classList.remove('open'); // для визуализации кнопки
    });
  });
}
