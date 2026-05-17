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

function setUser(user) {
  localStorage.setItem("spm_user", JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem("spm_user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

function clearUser() {
  localStorage.removeItem("spm_user");
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

  if (data.user) {
    setUser(data.user);
  }

  return data;
}

function logout() {
  clearToken();
  clearUser();
}

function isAuthenticated() {
  return !!getToken();
}

export {
  register,
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated,
};