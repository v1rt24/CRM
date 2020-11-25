export const setLocalStorage = (key, data) => {
  if (key && data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getLocalStorage = key => {
  if (key) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
};

export const clearLocalStorage = key => {
  if (key) {
    localStorage.removeItem(key);
  }
};