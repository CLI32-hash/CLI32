/**
 * Generic API layer: uses LocalStorage for MVP, structured for seamless Spring Boot migration.
 */
export const getLocalData = (key, fallback) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

export const setLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};