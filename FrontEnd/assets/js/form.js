// Gestion du formulaire d'ajout de travaux

import { addWork } from './api.js';
import { afficherGalerie } from './gallery.js';
import { afficherGalerieModale, getAllWorksRef, setAllWorksRef } from './modal.js';
import { getToken } from './auth.js';

export function initImagePreview() {
  const imageUploadInput = document.querySelector("#image-upload");
  const imagePreview = document.querySelector("#image-preview");
  const uploadZone = document.querySelector(".upload-zone");

  imageUploadInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove("hidden");
        uploadZone.querySelector("i").classList.add("hidden");
        uploadZone.querySelector(".upload-btn").classList.add("hidden");
        uploadZone.querySelector(".upload-info").classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  });
}

export function initFormValidation() {
  const imageUploadInput = document.querySelector("#image-upload");
  const workTitle = document.querySelector("#work-title");
  const workCategory = document.querySelector("#work-category");
  const btnValidate = document.querySelector(".btn-validate");

  function checkFormValidity() {
    const hasImage = imageUploadInput.files.length > 0;
    const hasTitle = workTitle.value.trim() !== "";
    const hasCategory = workCategory.value !== "";

    if (hasImage && hasTitle && hasCategory) {
      btnValidate.disabled = false;
    } else {
      btnValidate.disabled = true;
    }
  }

  imageUploadInput.addEventListener('change', checkFormValidity);
  workTitle.addEventListener('input', checkFormValidity);
  workCategory.addEventListener('change', checkFormValidity);
}

export function initFormSubmit() {
  const imageUploadInput = document.querySelector("#image-upload");
  const workTitle = document.querySelector("#work-title");
  const workCategory = document.querySelector("#work-category");
  const btnValidate = document.querySelector(".btn-validate");
  const modal = document.querySelector("#modal");
  const imagePreview = document.querySelector("#image-preview");
  const uploadZone = document.querySelector(".upload-zone");

  btnValidate.addEventListener('click', async function (event) {
    event.preventDefault();
    const image = imageUploadInput.files[0];
    const title = workTitle.value;
    const category = workCategory.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    const token = getToken();
    const response = await addWork(formData, token);

    if (response.ok) {
      const newWork = await response.json();
      let allWorks = getAllWorksRef();
      allWorks.push(newWork);
      setAllWorksRef(allWorks);
      afficherGalerie(allWorks);
      afficherGalerieModale();
      modal.classList.add('hidden');
      imageUploadInput.value = '';
      workTitle.value = '';
      workCategory.value = '';
      imagePreview.classList.add('hidden');
      uploadZone.querySelector("i").classList.remove("hidden");
      uploadZone.querySelector(".upload-btn").classList.remove("hidden");
      uploadZone.querySelector(".upload-info").classList.remove("hidden");
    } else {
      alert('Erreur dans le formulaire. Veuillez réessayer.');
    }
  });
}

export function populateCategorySelect(categories) {
  const categorySelect = document.querySelector("#work-category");
  
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
