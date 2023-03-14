export const setSessionService = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = () => {
  const auth = JSON.parse(localStorage.getItem("token") || "");
  return auth;
};
