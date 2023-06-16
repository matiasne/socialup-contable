export const setSessionService = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = () => {
  console.log("session");
  const auth = JSON.parse(localStorage.getItem("token") || "");

  if (auth !== "") {
    return true;
  } else {
    return false;
  }
};
export const getSessionBusiness = () => {
  const authBusiness = JSON.parse(localStorage.getItem("business") || "");

  if (authBusiness !== "") {
    return true;
  } else {
    return false;
  }

}
