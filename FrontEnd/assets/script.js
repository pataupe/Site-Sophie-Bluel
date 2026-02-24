// Récupérer les travaux depuis l'API
let allWorks =[]
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
    });
  });


 