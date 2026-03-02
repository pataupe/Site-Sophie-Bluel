const token = localStorage.getItem("token");

if (token) {
  document.querySelector(".edit-banner").classList.remove("hidden");
  document.querySelector(".edit-button").classList.remove("hidden");
  document.querySelector(".filters").style.display = "none";

  const loginLink = document.querySelector("#login-link");
loginLink.textContent = "logout";
loginLink.href = "#";
loginLink.addEventListener('click', function(event) {
  event.preventDefault();
  localStorage.removeItem("token");
  window.location.reload();
});

const modal = document.querySelector("#modal");
const editButton = document.querySelector(".edit-button");
const closeModalBtn = document.querySelector(".close-modal");

editButton.addEventListener('click', function() {
  modal.classList.remove("hidden");
  afficherGalerieModale()
});

closeModalBtn.addEventListener('click', function() {
  modal.classList.add("hidden");
});

modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

const btnAddPhoto = document.querySelector(".btn-add-photo");
const backToGallery = document.querySelector(".back-to-gallery");
const modalGalleryView = document.querySelector(".modal-gallery-view");
const modalFormView = document.querySelector(".modal-form-view");

btnAddPhoto.addEventListener('click', function() {
  modalGalleryView.classList.add("hidden");
  modalFormView.classList.remove("hidden");
});

backToGallery.addEventListener('click', function() {
  modalFormView.classList.add("hidden");
  modalGalleryView.classList.remove("hidden");
});

const imageUploadInput = document.querySelector("#image-upload");
const imagePreview = document.querySelector("#image-preview");
const uploadZone = document.querySelector(".upload-zone");

imageUploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove("hidden");
      uploadZone.querySelector("i").classList.add("hidden");
      uploadZone.querySelector(".upload-btn").classList.add("hidden");
      uploadZone.querySelector(".upload-info").classList.add("hidden");
    };
    reader.readAsDataURL(file);
  }
});

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

function afficherGalerieModale() {
  const modalGalleryGrid = document.querySelector(".modal-gallery-grid");
  modalGalleryGrid.innerHTML = "";
  
  allWorks.forEach(work => {
    const item = document.createElement("div");
    item.className = "modal-gallery-item";
    
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-icon";
    deleteBtn.innerHTML =  '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.dataset.id = work.id;

    deleteBtn.addEventListener('click', async function() {
  const workId = this.dataset.id;
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    allWorks = allWorks.filter(work => work.id != workId);
    afficherGalerie(allWorks);
    afficherGalerieModale();
  }
});
    
    item.appendChild(img);
    item.appendChild(deleteBtn);
    modalGalleryGrid.appendChild(item);
  });
}

let allWorks = []
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    allWorks = works;
    afficherGalerie(allWorks);
  });

function afficherGalerie(listeTravaux) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  
  listeTravaux.forEach(work => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}
  fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
    const filtersContainer = document.querySelector(".filters");
    
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.addEventListener('click', function() {
    afficherGalerie(allWorks);
    });
    filtersContainer.appendChild(btnAll);
    
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
        btn.addEventListener('click', function() {
    const filtres = allWorks.filter(work => work.categoryId === category.id);
    afficherGalerie(filtres);
  });
      filtersContainer.appendChild(btn);

      const categorySelect = document.querySelector("#work-category");
const option = document.createElement("option");
option.value = category.id;
option.textContent = category.name;
categorySelect.appendChild(option);
    });
    
  });


 