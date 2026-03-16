// Gestion de l'authentification

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return getToken() !== null;
}

export function initLogout() {
  const loginLink = document.querySelector("#login-link");
  loginLink.textContent = "logout";
  loginLink.href = "#";
  loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  });
}

export function showEditMode() {
  document.querySelector(".edit-banner").classList.remove("hidden");
  document.querySelector(".edit-button").classList.remove("hidden");
  document.querySelector(".filters").style.display = "none";
}
