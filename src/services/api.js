// src/services/api.js

const API_BASE_URL = "https://selezione-ia-backend.onrender.com";

// Assistant Luxe IA
export const askLuxeAssistant = async (message, mode = "default") => {
  const res = await fetch(`${API_BASE_URL}/assistant-luxe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, mode }),
  });
  return await res.json();
};

// Actu Luxe IA
export const getActusLuxe = async (sujet, type) => {
  const res = await fetch(`${API_BASE_URL}/actus-luxe-ia`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sujet, type }),
  });
  return await res.json();
};

// Assistant Style
export const askStyleAssistant = async (message) => {
  const res = await fetch(`${API_BASE_URL}/assistant-style`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return await res.json();
};

// Fiche Produit
export const generateFicheProduit = async (produit) => {
  const res = await fetch(`${API_BASE_URL}/fiche-produit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produit }),
  });
  return await res.json();
};

// Estimation Luxe
export const estimateLuxeProduct = async (description) => {
  const res = await fetch(`${API_BASE_URL}/estimation-luxe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  return await res.json();
};

// Comparateur Luxe
export const compareLuxeProduct = async (produit) => {
  const res = await fetch(`${API_BASE_URL}/comparateur-luxe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produit }),
  });
  return await res.json();
};

// Actus RSS Luxe
export const getRssLuxe = async (sujet, date) => {
  const res = await fetch(`${API_BASE_URL}/rss-luxe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sujet, date }),
  });
  return await res.json();
};

// Scraping Vestiaire Collective
export const scrapeVestiaire = async (query) => {
  const res = await fetch(`${API_BASE_URL}/scrape-vestiaire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return await res.json();
};

// Envoi d'une commande
export const submitCommande = async (user, fichier, selections) => {
  const res = await fetch(`${API_BASE_URL}/api/commande`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, fichier, selections }),
  });
  return await res.json();
};

// Quiz : envoi score
export const submitQuizScore = async (userId, moduleId, score) => {
  const res = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, moduleId, score }),
  });
  return await res.json();
};

// Quiz : vérification score
export const checkModuleValidation = async (userId, moduleId) => {
  const res = await fetch(`${API_BASE_URL}/api/module/status/${userId}/${moduleId}`);
  return await res.json();
};
