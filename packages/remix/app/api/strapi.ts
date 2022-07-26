export const fetchStrapi = async (endpoint: string): Promise<Response> => {
  return fetch(`${process.env.STRAPI_URL_BASE}/api/${endpoint}?populate=deep`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchFindStrapi = async (
  endpoint: string,
  field: string,
  search: string
): Promise<Response> => {
  return fetch(
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

export const getApplication = async (
  code: string
): Promise<applicationType> => {
  const mainResponse = await fetchStrapi("main-application");
  const response = await fetchFindStrapi("applications", "code", code);

  const {
    profile: mainProfile,
    experience: mainExperience,
    cover_letter: mainCoverLetter,
  } = flattenObj(await mainResponse.json());

  const {
    profile,
    experience,
    recipient,
    cover_letter: coverLetter,
  } = flattenObj(await response.json())[0];

  return {
    profile: override(mainProfile, profile),
    experience: override(mainExperience, experience),
    recipient,
    coverLetter: override(mainCoverLetter, coverLetter),
  };
};

const override = <T extends experienceType | profileType>(
  base: T,
  overrides: T
): T => {
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

export const checkCode = async (code: string): Promise<boolean> => {
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

export type applicationType = {
  code?: string;
  profile: profileType;
  experience: experienceType;
  recipient: recipientType;
  picture?: any;
  coverLetter: coverLetterType;
};

export type profileType = {
  [key: string]: any;
  personal: {
    firstName: string;
    lastName: string;
    sex: string;
    contacts: strapiValueType[];
    picture: pictureType;
    adress: adressType;
  };
  strengths: strapiValueType[];
  interests: strapiValueType[];
  software: strapiValueType[];
  summary: string;
  languages: languageValueType[];
};

export type pictureType = {
  formats: {
    thumbnail: formatType;
    large: formatType;
    medium: formatType;
    small: formatType;
  };
};

export type adressType = {
  streetname: string;
  housenumber: string;
  city: string;
  postcode: string;
};

export type formatType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type strapiValueType = {
  label?: string;
  value: string;
  icon?: string;
};
export type languageValueType = {
  label: string;
  value: number;
};

export type experienceType = {
  [key: string]: any;
  work: occupationType[];
  education: occupationType[];
  internships: occupationType[];
};

export type occupationType = {
  date_range: {
    start: string;
    end: string;
  };
  title: string;
  organization: organizationType;
  tasks: strapiValueType[];
};

export type organizationType = {
  name: string;
  location: string;
};

export type recipientType = {
  company: companyType;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  street: string;
  city: string;
  locale: locales;
};

export type companyType = {
  color?: string;
  name: string;
};

export type coverLetterType = {
  title: string;
  opening: string;
  body: string;
  closing: string;
  formalClosing: string;
  greeting: string;
  date: string;
};

export enum locales {
  English = "en",
  German = "de",
}

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
