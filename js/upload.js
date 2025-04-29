// upload.js

// Функция инициализации загрузки изображений
export function initUpload() {
  // Получаем элементы формы и кнопки загрузки
  const photoInput = document.getElementById('photo-input');
  const previewContainer = document.getElementById('preview-container');
  const dropZone = document.querySelector('.drop-zone');
  const uploadButton = document.querySelector('.upload-btn');
  const uploadForm = document.getElementById('upload-form');

  // Загружаем уже сохранённые изображения из localStorage
  const savedImages = loadImagesFromStorage();
  renderImages(savedImages); // Показываем их в галерее

  // Обработчик для поля выбора файлов
  photoInput.addEventListener('change', (event) => {
    const files = event.target.files;
    console.log('Files selected:', files); // Логируем выбранные файлы
    handleFiles(files); // Обрабатываем выбранные файлы
  });

  // Обработчик drag-and-drop
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
    const files = e.dataTransfer.files; // Получаем перетащенные файлы
    console.log('Files dropped:', files); // Логируем перетащенные файлы
    handleFiles(files); // Обрабатываем их
  });

  // Отмена отправки формы по умолчанию
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // Обработчик клика по кнопке "Загрузить"
  uploadButton.addEventListener('click', (e) => {
    e.preventDefault(); // Останавливаем действие по умолчанию

    // Перемещаем все изображения из превью в галерею и сохраняем их
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

  // Обработка файлов
  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result; // base64 строка изображения
          const id = crypto.randomUUID(); // Генерация уникального id для изображения

          const imageObject = { id, dataUrl }; // Создаем объект изображения
          previewImage(imageObject); // Добавляем изображение в предпросмотр

          // Задержка для работы с EXIF
          setTimeout(() => {
            console.log('Reading EXIF data from file:', file);
            readExifData(file); // Чтение EXIF данных
          }, 100); // Необходимо подождать, пока изображение будет готово
        };
        reader.readAsDataURL(file); // Чтение файла как base64
      }
    });
    previewContainer.style.display = 'block'; // Показываем контейнер с предпросмотром
  }

  // Функция для отображения предпросмотра одного изображения
  function previewImage({ id, dataUrl }) {
    const img = document.createElement('img');
    img.src = dataUrl;
    img.classList.add('preview-image');
    img.dataset.id = id; // Присваиваем уникальный идентификатор
    previewContainer.appendChild(img); // Добавляем изображение в контейнер предпросмотра
  }

  // Функция для чтения EXIF-метаданных изображения
  // Функция для чтения EXIF-метаданных изображения
  function readExifData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      console.log('ArrayBuffer loaded, size:', arrayBuffer.byteLength);

      // Преобразуем ArrayBuffer в DataView для EXIF
      const view = new DataView(arrayBuffer);

      // Попробуем использовать EXIF.getData() для извлечения данных
      EXIF.getData(file, function () {
        const exifData = EXIF.getAllTags(this); // Получаем все EXIF-метаданные
        console.log('EXIF getData() called.');

        if (exifData && Object.keys(exifData).length > 0) {
          console.log('EXIF data for image:', exifData); // Выводим EXIF данные в консоль
        } else {
          console.log('No EXIF data found.'); // Если EXIF пустое
        }
      });

      // Альтернативно, можно попытаться извлечь данные через DataView
      EXIF.getData(view, function () {
        const exifData = EXIF.getAllTags(this); // Получаем EXIF через DataView
        console.log('EXIF data from DataView:', exifData);
        if (exifData && Object.keys(exifData).length > 0) {
          console.log('EXIF data from DataView:', exifData); // Логируем данные
        } else {
          console.log('No EXIF data found via DataView.');
        }
      });
    };
    reader.readAsArrayBuffer(file); // Чтение файла как ArrayBuffer для EXIF
  }

  // Отрисовка всех сохранённых изображений в галерее
  function renderImages(images) {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = ''; // Очищаем контейнер перед рендером

    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.dataUrl;
      img.alt = 'Фото';
      img.classList.add('gallery-image');
      galleryContainer.appendChild(img);
    });
  }

  // Загрузка изображений из localStorage
  function loadImagesFromStorage() {
    const raw = localStorage.getItem('familyAlbumImages');
    return raw ? JSON.parse(raw) : [];
  }

  // Сохранение одного изображения в localStorage
  function saveImageToStorage(imageObject) {
    const current = loadImagesFromStorage(); // Загружаем текущие изображения
    current.push(imageObject); // Добавляем новое изображение
    localStorage.setItem('familyAlbumImages', JSON.stringify(current)); // Сохраняем в localStorage
  }
}
