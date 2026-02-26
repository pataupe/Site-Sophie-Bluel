const loginForm = document.getElementById('formId');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginErrorId');


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    let emailValue = emailInput.value;
let passwordValue = passwordInput.value;

const response = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: emailValue, password: passwordValue })
});

if (response.ok) {
  const data = await response.json();
  localStorage.setItem("token", data.token);
  window.location.href = "index.html";
} else {
  loginError.textContent = "Erreur dans l’identifiant ou le mot de passe";
  passwordInput.value = "";
}
})



