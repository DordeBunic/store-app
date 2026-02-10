import { PRE_LOGIN_PAGES, POST_LOGIN_PAGES } from "@/constants/pageRoutes";

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPreLoginPage = (path: string): boolean => {
  return Object.values(PRE_LOGIN_PAGES).includes(path);
};

export const isPostLoginPage = (path: string): boolean => {
  return Object.values(POST_LOGIN_PAGES).includes(path);
};
