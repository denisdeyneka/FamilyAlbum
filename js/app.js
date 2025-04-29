// js/app.js

import { initNavigation } from './navigation.js';
import { initUpload } from './upload.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initUpload(); // Инициализация функции загрузки изображений
  console.log('DOMContentLoaded event fired'); // Debugging line
});
