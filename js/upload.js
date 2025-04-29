export function initUpload() {
  // Инициализация функции загрузки изображений

  // Получаем элементы
  const photoInput = document.getElementById('photo-input');
  const previewContainer = document.getElementById('preview-container'); // Контейнер для предварительного просмотра
  const dropZone = document.querySelector('.drop-zone'); // Элемент для перетаскивания файлов

  // Слушаем выбор файлов через стандартное окно загрузки
  photoInput.addEventListener('change', handleFileSelect);

  // Слушаем события на перетаскивание файлов
  dropZone.addEventListener('dragover', handleDragOver);
  dropZone.addEventListener('dragleave', handleDragLeave);
  dropZone.addEventListener('drop', handleDrop);

  // Функция для обработки выбора файлов через стандартное окно
  function handleFileSelect(event) {
    const files = event.target.files; // Получаем выбранные файлы

    // Очищаем контейнер предварительного просмотра
    previewContainer.innerHTML = '';

    // Перебираем файлы и создаем для каждого превью
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        // Проверяем, что файл - изображение
        const reader = new FileReader(); // Создаем FileReader для чтения файла

        // Когда файл загружен, создаем элемент img и добавляем его в контейнер
        reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result; // Устанавливаем src изображения
          img.classList.add('preview-image'); // Добавляем класс для стилей
          previewContainer.appendChild(img); // Добавляем изображение в контейнер
        };

        reader.readAsDataURL(file); // Читаем файл как Data URL
      }
    });
  }

  // Функция для обработки перетаскивания файлов
  function handleDragOver(event) {
    event.preventDefault(); // Останавливаем стандартное поведение браузера
    dropZone.classList.add('dragover'); // Добавляем класс для визуального эффекта
  }

  // Функция для обработки выхода из зоны перетаскивания
  function handleDragLeave() {
    dropZone.classList.remove('dragover'); // Убираем эффект визуального наведения
  }

  // Функция для обработки события "падения" файла в зону
  function handleDrop(event) {
    event.preventDefault(); // Останавливаем стандартное поведение браузера
    dropZone.classList.remove('dragover'); // Убираем эффект визуального наведения

    const files = event.dataTransfer.files; // Получаем файлы из события

    // Очищаем контейнер предварительного просмотра
    previewContainer.innerHTML = '';

    // Перебираем файлы и создаем для каждого превью
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        // Проверяем, что файл - изображение
        const reader = new FileReader(); // Создаем FileReader для чтения файла

        // Когда файл загружен, создаем элемент img и добавляем его в контейнер
        reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result; // Устанавливаем src изображения
          img.classList.add('preview-image'); // Добавляем класс для стилей
          previewContainer.appendChild(img); // Добавляем изображение в контейнер
        };

        reader.readAsDataURL(file); // Читаем файл как Data URL
      }
    });
  }
}
