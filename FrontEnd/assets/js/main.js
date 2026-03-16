// Point d'entrée de l'application

import { fetchWorks, fetchCategories } from './api.js';
import { isAuthenticated, showEditMode, initLogout } from './auth.js';
import { afficherGalerie, initFilters } from './gallery.js';
import { initModal, initModalNavigation, setAllWorksRef } from './modal.js';
import { initImagePreview, initFormValidation, initFormSubmit, populateCategorySelect } from './form.js';

async function init() {
  // Chargement des données
  const works = await fetchWorks();
  const categories = await fetchCategories();
  
  // Stockage des works pour utilisation globale
  setAllWorksRef(works);
  
  // Affichage de la galerie
  afficherGalerie(works);
  
  // Si l'utilisateur est connecté
  if (isAuthenticated()) {
    // Afficher le mode édition
    showEditMode();
    
    // Initialiser le logout
    initLogout();
    
    // Initialiser la modale
    initModal();
    initModalNavigation();
    
    // Initialiser le formulaire
    initImagePreview();
    initFormValidation();
    initFormSubmit();
    populateCategorySelect(categories);
  } else {
    // Sinon, afficher les filtres
    initFilters(categories, works);
  }
}

// Démarrage de l'application
init();
