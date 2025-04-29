// js/app.js

import { initNavigation } from './navigation.js'; // Импорт функции инициализации навигации
import { initUpload } from './upload.js'; // Импорт функции инициализации загрузки изображений
import { initGallery } from './gallery.js'; // Импорт функции инициализации галереи

document.addEventListener('DOMContentLoaded', () => {
  initNavigation(); // Инициализация функции навигации
  initUpload(); // Инициализация функции загрузки изображений
  initGallery(); // Инициализация функции галереи
});
