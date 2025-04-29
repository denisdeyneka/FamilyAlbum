// js/gallery.js
import { loadImagesFromStorage } from './storage.js';

export function initGallery() {
  const galleryContainer = document.getElementById('galleryContainer');
  if (!galleryContainer) return;

  const images = loadImagesFromStorage();
  galleryContainer.innerHTML = '';

  images.forEach((image) => {
    const img = document.createElement('img');
    img.src = image.dataUrl;
    img.alt = 'Фото';
    img.classList.add('gallery-image');
    galleryContainer.appendChild(img);
  });
}
