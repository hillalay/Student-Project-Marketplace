import { apiRequest } from "./api";

function setToken(token) {
  localStorage.setItem("spm_token", token);
}

function getToken() {
  return localStorage.getItem("spm_token");
}

function clearToken() {
  localStorage.removeItem("spm_token");
}

async function register({ fullName, email, password }) {
  return apiRequest("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: fullName, email, password }),
  });
}

async function login({ email, password }) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

function logout() {
  clearToken();
}

function isAuthenticated() {
  return !!getToken();
}

export { register, login, logout, getToken, isAuthenticated };
