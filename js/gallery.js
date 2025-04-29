// gallery.js

// Функция для инициализации галереи
export function initGallery() {
  // Загружаем изображения из localStorage
  const images = loadImagesFromStorage();

  // Если есть изображения, отрисовываем их в галерее
  renderImages(images);
}

// Функция для отрисовки изображений в галерее
function renderImages(images) {
  const galleryContainer = document.getElementById('galleryContainer');

  // Очищаем контейнер перед рендером новых изображений
  galleryContainer.innerHTML = '';

  // Если в хранилище есть изображения, создаём элементы img для их отображения
  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image.dataUrl; // Присваиваем источник изображения
    img.alt = 'Фото'; // Текст для атрибута alt
    img.classList.add('gallery-image'); // Добавляем класс для стилизации
    galleryContainer.appendChild(img); // Добавляем изображение в контейнер галереи
  });
}

// Функция для загрузки изображений из localStorage
function loadImagesFromStorage() {
  // Получаем данные из localStorage
  const raw = localStorage.getItem('familyAlbumImages');

  // Если данные есть, парсим их, если нет — возвращаем пустой массив
  return raw ? JSON.parse(raw) : [];
}
