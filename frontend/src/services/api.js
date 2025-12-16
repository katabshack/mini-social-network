import axios from 'axios';

// On pointe vers ton backend (vérifie que ton backend tourne bien sur le port 5000)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

// Intercepteur : Ajoute automatiquement le token à chaque requête si on est connecté
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;