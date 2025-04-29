// js/storage.js

export function loadImagesFromStorage() {
  const raw = localStorage.getItem('familyAlbumImages');
  return raw ? JSON.parse(raw) : [];
}

export function saveImageToStorage(imageObject) {
  const current = loadImagesFromStorage();
  current.push(imageObject);
  localStorage.setItem('familyAlbumImages', JSON.stringify(current));
}
