// Gestion de la modale et suppression des travaux

import { deleteWork } from './api.js';
import { afficherGalerie } from './gallery.js';
import { getToken } from './auth.js';

let allWorksRef = [];

export function setAllWorksRef(works) {
  allWorksRef = works;
}

export function getAllWorksRef() {
  return allWorksRef;
}

export function afficherGalerieModale() {
  const modalGalleryGrid = document.querySelector(".modal-gallery-grid");
  modalGalleryGrid.innerHTML = "";

  allWorksRef.forEach(work => {
    const item = document.createElement("div");
    item.className = "modal-gallery-item";

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-icon";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.dataset.id = work.id;

    deleteBtn.addEventListener('click', async function () {
      const workId = this.dataset.id;
      const token = getToken();
      const response = await deleteWork(workId, token);

      if (response.ok) {
        allWorksRef = allWorksRef.filter(work => work.id != workId);
        afficherGalerie(allWorksRef);
        afficherGalerieModale();
      }
    });

    item.appendChild(img);
    item.appendChild(deleteBtn);
    modalGalleryGrid.appendChild(item);
  });
}

function resetModalViews() {
  const modalGalleryView = document.querySelector(".modal-gallery-view");
  const modalFormView = document.querySelector(".modal-form-view");
  
  modalGalleryView.classList.remove("hidden");
  modalFormView.classList.add("hidden");
}

export function initModal() {
  const modal = document.querySelector("#modal");
  const editButton = document.querySelector(".edit-button");
  const closeModalBtn = document.querySelector(".close-modal");

  editButton.addEventListener('click', function () {
    modal.classList.remove("hidden");
    afficherGalerieModale();
  });

  closeModalBtn.addEventListener('click', function () {
    modal.classList.add("hidden");
    resetModalViews();
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
      resetModalViews();
    }
  });
}

export function initModalNavigation() {
  const btnAddPhoto = document.querySelector(".btn-add-photo");
  const backToGallery = document.querySelector(".back-to-gallery");
  const modalGalleryView = document.querySelector(".modal-gallery-view");
  const modalFormView = document.querySelector(".modal-form-view");

  btnAddPhoto.addEventListener('click', function () {
    modalGalleryView.classList.add("hidden");
    modalFormView.classList.remove("hidden");
  });

  backToGallery.addEventListener('click', function () {
    modalFormView.classList.add("hidden");
    modalGalleryView.classList.remove("hidden");
  });
}
