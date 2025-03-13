export const isHomePage = (pathname: string) => {
  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl === "/") {
    return pathname === "/";
  }

  return pathname === baseUrl || pathname === baseUrl.replace(/\/$/, "");
};
