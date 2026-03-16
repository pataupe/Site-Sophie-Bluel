const token = localStorage.getItem("token");

if (token) {
  document.querySelector(".edit-banner").classList.remove("hidden");
  document.querySelector(".edit-button").classList.remove("hidden");
  document.querySelector(".filters").style.display = "none";

  const loginLink = document.querySelector("#login-link");
  loginLink.textContent = "logout";
  loginLink.href = "#";
  loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  });

  const modal = document.querySelector("#modal");
  const editButton = document.querySelector(".edit-button");
  const closeModalBtn = document.querySelector(".close-modal");

  editButton.addEventListener('click', function () {
    modal.classList.remove("hidden");
    afficherGalerieModale()
  });

  closeModalBtn.addEventListener('click', function () {
    modal.classList.add("hidden");
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

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

  btnValidate.addEventListener('click', async function (event) {
  event.preventDefault();
  const image = imageUploadInput.files[0]
  const title = workTitle.value
  const category = workCategory.value

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const response = await fetch('http://localhost:5678/api/works' , {
    method : 'POST',
    headers : {
      'Authorization' : `Bearer ${token}`
    },
    body : formData
  })
  if (response.ok) {
    const newWork = await response.json();
  allWorks.push(newWork);
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
  }
  else {
    alert('Erreur dans le formulaire. Veuillez réessayer.')
  }
});
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
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.dataset.id = work.id;

    deleteBtn.addEventListener('click', async function () {
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

async function chargerWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  allWorks = works;
  afficherGalerie(allWorks);
}

chargerWorks();

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

async function chargerCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  
  const filtersContainer = document.querySelector(".filters");

  const btnAll = document.createElement("button");
  btnAll.textContent = "Tous";
  btnAll.classList.add('active') 
  btnAll.addEventListener('click', function () {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
  });
  btnAll.classList.add('active');
  afficherGalerie(allWorks);
});
  filtersContainer.appendChild(btnAll);

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.addEventListener('click', function () {
  document.querySelectorAll('.filters button').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  
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
}

chargerCategories();

