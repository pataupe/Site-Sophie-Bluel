// Toutes les requêtes API
const API_URL = "http://localhost:5678/api";

export async function fetchWorks() {
  const response = await fetch(`${API_URL}/works`);
  const works = await response.json();
  return works;
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`);
  const categories = await response.json();
  return categories;
}

export async function deleteWork(workId, token) {
  const response = await fetch(`${API_URL}/works/${workId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response;
}

export async function addWork(formData, token) {
  const response = await fetch(`${API_URL}/works`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  return response;
}
