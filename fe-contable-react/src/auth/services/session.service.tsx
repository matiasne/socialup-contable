export const setSessionService = (key: string, value: string) => {
  console.log(value);
  console.log(key);
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = (key: string) => {
  const auth = localStorage.getItem(key);
  console.log(key);
  if (auth && auth !== "") {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth;
  } else {
    return null;
  }
};
