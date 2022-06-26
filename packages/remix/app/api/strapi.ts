export const fetchStrapi = async (endpoint: string) => {
  return await fetch(
    `${process.env.STRAPI_URL_BASE}/api/${endpoint}?populate=deep`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchFindStrapi = async (endpoint: string, search: string) => {
  return await fetch(
    `${process.env.STRAPI_URL_BASE}/api/${endpoint}?filters[code][$eq]=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};
