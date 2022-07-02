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

export const fetchFindStrapi = async (
  endpoint: string,
  field: string,
  search: string
) => {
  return await fetch(
    `${process.env.STRAPI_URL_BASE}/api/${endpoint}?populate=deep&filters[${field}][$eq]=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getApplication = async (code: string) => {
  const mainResponse = await fetchStrapi("main-application");
  const response = await fetchFindStrapi("applications", "code", code);

  const { profile: mainProfile, experience: mainExperience } = flattenObj(
    await mainResponse.json()
  );

  const { profile, experience } = flattenObj(await response.json())[0];

  return {
    profile: override(mainProfile, profile),
    experience: override(mainExperience, experience),
  };
};

const override = (
  base: { [key: string]: any },
  overrides: { [key: string]: any }
) => {
  for (const [key] of Object.entries(base)) {
    if (
      overrides &&
      key in overrides &&
      overrides[key] &&
      (!Array.isArray(overrides[key]) || overrides[key].length > 0)
    ) {
      base[key] = overrides[key];
    }
  }
  return base;
};

export const checkCode = async (code: string) => {
  const response = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/applications?filters[code][$eq]=${code}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const results = await response.json();
  return results.data.length > 0;
};

//from https://stackoverflow.com/questions/71063570/strapi-version-4-flatten-complex-response-structure
export const flattenObj = (data: any) => {
  const isObject = (data: any) =>
    Object.prototype.toString.call(data) === "[object Object]";
  const isArray = (data: any) =>
    Object.prototype.toString.call(data) === "[object Array]";

  const flatten = (data: any) => {
    if (!data.attributes) return data;

    return {
      id: data.id,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item: any) => flattenObj(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = flattenObj(data[key]);
    }

    return data;
  }

  return data;
};
