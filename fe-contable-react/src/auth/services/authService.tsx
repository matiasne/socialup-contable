export const setSessionService = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = () => {
  console.log("session");
  const auth = JSON.parse(localStorage.getItem("token") || "");

  if (auth !== "") {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
};
