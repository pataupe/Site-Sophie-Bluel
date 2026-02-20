// Récupérer les travaux depuis l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    // Récupérer l'élément HTML de la galerie
    const gallery = document.querySelector(".gallery");
    
    // Pour chaque projet, créer un élément HTML
    works.forEach(work => {
      // Créer une figure
      const figure = document.createElement("figure");
      
      // Créer l'image
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      
      // Créer le titre
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;
      
      // Assembler le tout
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  });

  fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
    const filtersContainer = document.querySelector(".filters");
    
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    filtersContainer.appendChild(btnAll);
    
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      filtersContainer.appendChild(btn);
    });
  });