export function initUpload() {
  // Получаем элементы формы, инпут и контейнер предпросмотра
  const photoInput = document.getElementById('photo-input'); // Поле выбора файлов
  const previewContainer = document.getElementById('preview-container'); // Контейнер для предпросмотра
  const dropZone = document.querySelector('.drop-zone'); // Зона перетаскивания
  const uploadForm = document.getElementById('upload-form'); // Форма загрузки
  const uploadButton = document.querySelector('.upload-btn'); // Кнопка "Загрузить"

  // Загружаем уже сохранённые изображения из localStorage
  const savedImages = loadImagesFromStorage(); // [{ id, dataUrl }, ...]
  renderImages(savedImages); // Показываем их при загрузке страницы

  // Обработчик обычной загрузки через input
  photoInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files); // Обрабатываем выбранные файлы
  });

  // Обработка drag-and-drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Отключаем поведение браузера по умолчанию
    dropZone.classList.add('dragover'); // Визуальный эффект при перетаскивании
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover'); // Убираем эффект при выходе
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); // Отмена действия браузера
    dropZone.classList.remove('dragover'); // Убираем эффект
    const files = e.dataTransfer.files; // Получаем файлы, которые перетащили
    handleFiles(files); // Обрабатываем их
  });

  // Отмена отправки формы по умолчанию (если кто-то нажмёт кнопку)
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Мы не отправляем форму на сервер пока
  });

  // Обработчик клика по кнопке "Загрузить"
  uploadButton.addEventListener('click', (e) => {
    e.preventDefault(); // Останавливаем действие по умолчанию

    // Перемещаем все изображения из превью в галерею и сохраняем в localStorage
    const imagesToSave = Array.from(
      previewContainer.querySelectorAll('img')
    ).map((img) => {
      return {
        id: img.dataset.id,
        dataUrl: img.src,
      };
    });

    // Сохраняем изображения в localStorage
    imagesToSave.forEach(saveImageToStorage);

    // Очищаем контейнер для предпросмотра
    previewContainer.innerHTML = '';
    previewContainer.style.display = 'none'; // Скрываем контейнер

    // Перерисовываем галерею с новыми изображениями
    renderImages(loadImagesFromStorage());
  });

  /**
   * Обработка загруженных файлов
   */
  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataUrl = e.target.result; // Base64-строка изображения
          const id = crypto.randomUUID(); // Уникальный идентификатор для каждого изображения

          const imageObject = { id, dataUrl }; // Объект с id и содержимым

          previewImage(imageObject); // Показываем изображение в интерфейсе
        };

        reader.readAsDataURL(file); // Читаем как base64
      }
    });

    previewContainer.style.display = 'block'; // Показываем контейнер с превью
  }

  /**
   * Предпросмотр одного изображения
   */
  function previewImage({ id, dataUrl }) {
    const img = document.createElement('img');
    img.src = dataUrl;
    img.classList.add('preview-image');
    img.dataset.id = id; // Добавляем id для будущего удаления
    previewContainer.appendChild(img);
  }

  /**
   * Отрисовка всех сохранённых изображений в галерее
   */
  function renderImages(images) {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = ''; // Очищаем перед рендером

    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.dataUrl;
      img.alt = 'Фото';
      img.classList.add('gallery-image');
      galleryContainer.appendChild(img);
    });
  }

  /**
   * Загрузка изображений из localStorage
   */
  function loadImagesFromStorage() {
    const raw = localStorage.getItem('familyAlbumImages');
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Сохранение одного изображения в localStorage
   */
  function saveImageToStorage(imageObject) {
    const current = loadImagesFromStorage(); // Загружаем текущие изображения
    current.push(imageObject); // Добавляем новое изображение
    localStorage.setItem('familyAlbumImages', JSON.stringify(current)); // Сохраняем в localStorage
  }
}
