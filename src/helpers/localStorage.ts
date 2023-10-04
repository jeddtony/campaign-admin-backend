const keyWord: string = "PREACHING_CAMPAIGN_ADMIN";

export const getToken = () => {
  return localStorage.getItem(keyWord + "_TOKEN");
};

export const setToken = (token: string) => {
  localStorage.setItem(keyWord + "_TOKEN", token);
};

export const getRole = () => {
  return localStorage.getItem(keyWord + "_ROLE");
};

export const setRole = (token: string) => {
  localStorage.setItem(keyWord + "_ROLE", token);
};

export const getCongregation = () => {
  return localStorage.getItem(keyWord + "_CONGREGATION");
};

export const setCongregation = (token: string) => {
  localStorage.setItem(keyWord + "_CONGREGATION", token);
};