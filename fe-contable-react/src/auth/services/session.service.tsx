export const setSessionService = (key: string, value: string) => {
  console.log(value);
  console.log(key);
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = (key: string) => {
  console.log(key);
  const auth = JSON.parse(localStorage.getItem(key) || "");
  return auth;
};
