export function initUpload() {
  // Инициализация функции загрузки изображений

  // Получаем элементы
  const photoInput = document.getElementById('photo-input');
  const previewContainer = document.getElementById('preview-container'); // Контейнер для предварительного просмотра
  const dropZone = document.getElementById('drop-zone'); // Элемент для перетаскивания файлов

  // Слушаем выбор файлов
  photoInput.addEventListener('change', function (event) {
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
  });
}
