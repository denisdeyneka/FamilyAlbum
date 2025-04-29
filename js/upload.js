// js/upload.js
import { loadImagesFromStorage, saveImageToStorage } from './storage.js';
import { initGallery } from './gallery.js';

export function initUpload() {
  const photoInput = document.getElementById('photo-input');
  const previewContainer = document.getElementById('preview-container');
  const dropZone = document.querySelector('.drop-zone');
  const uploadForm = document.getElementById('upload-form');
  const uploadButton = document.querySelector('.upload-btn');

  photoInput.addEventListener('change', (event) => {
    handleFiles(event.target.files);
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  uploadButton.addEventListener('click', (e) => {
    e.preventDefault();

    const imagesToSave = Array.from(
      previewContainer.querySelectorAll('img')
    ).map((img) => ({
      id: img.dataset.id,
      dataUrl: img.src,
    }));

    imagesToSave.forEach(saveImageToStorage);

    previewContainer.innerHTML = '';
    previewContainer.style.display = 'none';

    initGallery(); // перерисовываем
  });

  // Функция для обработки файлов
  // и отображения их в контейнере предпросмотра
  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataUrl = e.target.result;
          const id = crypto.randomUUID();
          previewImage({ id, dataUrl });
        };

        reader.readAsDataURL(file);
      }
    });

    previewContainer.style.display = 'block';
  }

  function previewImage({ id, dataUrl }) {
    const img = document.createElement('img');
    img.src = dataUrl;
    img.classList.add('preview-image');
    img.dataset.id = id;
    previewContainer.appendChild(img);
  }
}
