export const getFormData = (key) => {
  const rawFormData = sessionStorage.getItem(key);
  if (!rawFormData) {
    return [];
  }
  return JSON.parse(rawFormData);
};

export const setFormData = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};
