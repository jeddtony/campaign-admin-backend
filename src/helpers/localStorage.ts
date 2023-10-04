const keyWord: string = "PREACHING_CAMPAIGN_ADMIN";

export const getToken = () => {
  if (typeof window !== "undefined") {
  return localStorage.getItem(keyWord + "_TOKEN");
  }
  return '';
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
  localStorage.setItem(keyWord + "_TOKEN", token);
  }
};

export const getRole = () => {
  if (typeof window !== "undefined") {
  return localStorage.getItem(keyWord + "_ROLE");
}
return '';
};

export const setRole = (token: string) => {
  if (typeof window !== "undefined") {
  localStorage.setItem(keyWord + "_ROLE", token);
  }
};

export const getCongregation = () => {
  if (typeof window !== "undefined") {
  return localStorage.getItem(keyWord + "_CONGREGATION");
}
return '';
};

export const setCongregation = (token: string) => {
  if (typeof window !== "undefined") {
  localStorage.setItem(keyWord + "_CONGREGATION", token);
  }
};