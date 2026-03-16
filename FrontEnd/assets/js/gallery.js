// Affichage de la galerie et gestion des filtres

export function afficherGalerie(listeTravaux) {
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

export function initFilters(categories, allWorks) {
  const filtersContainer = document.querySelector(".filters");

  const btnAll = document.createElement("button");
  btnAll.textContent = "Tous";
  btnAll.classList.add('active');
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
  });
}
