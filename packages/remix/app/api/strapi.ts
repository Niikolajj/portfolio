export const fetchStrapi = async <T>(
  endpoint: string,
  parameters: { [key: string]: string | number } = {}
): Promise<T> => {
  const paramString = Object.keys(parameters)
    .map((key) => `${key}=${parameters[key]}`)
    .join("&");
    try {
      const response = await fetch(
        `${process.env.STRAPI_URL_BASE}/api/${endpoint}?${paramString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return flattenObj(await response.json());
    } catch (error) {
      throw new Error("cms connection failed")
    }
};


export const fetchFindStrapi = async <T>(
  endpoint: string,
  field: string,
  search: string,
  parameters: {} = {}
): Promise<T> => {
  const filter = `filters[${field}][$eq]`;
  return fetchStrapi<T>(endpoint, { ...parameters, [filter]: search });
};

export const getProjectsByTag = async (tag: string): Promise<tagType[]> => {
  return fetchFindStrapi<tagType[]>("tags", "slug", tag, {
    "populate[projects][populate][0]": "thumbnail",
  });
};

export const getProjectBySlug = async (
  slug: string
): Promise<projectType[]> => {
  return fetchFindStrapi("projects", "slug", slug);
};

export const getProjects = async (
  limit: number = 99,
  parameters: {} = {}
): Promise<projectType[]> => {
  return fetchStrapi("projects", {
    ...parameters,
  });
};

export const getTags = async () => {
  return fetchStrapi<tagType[]>("tags", { "populate[0]": "projects" });
};

export const getApplication = async (
  code: string
): Promise<applicationType> => {
  const mainResponse = await fetchStrapi<applicationType>("main-application", {
    populate: "deep",
  });
  const response = await fetchFindStrapi<applicationType[]>(
    "applications",
    "code",
    code,
    {
      populate: "deep",
    }
  );

  const { profile: mainProfile, experience: mainExperience } = mainResponse;

  const { profile, experience, recipient, coverLetter } = response[0];

  return {
    profile: override(mainProfile, profile),
    experience: override(mainExperience, experience),
    recipient,
    coverLetter,
  };
};

export const getPortfolio = async () => {
  return await fetchStrapi<portfolioType>("portfolio", { populate: "deep" });
};

const override = <T extends experienceType | profileType | coverLetterType>(
  base: T,
  overrides: T
): T => {
  for (const [key] of Object.entries(base ?? {})) {
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

export const checkCode = async (
  code: string,
  parameters: {} = {}
): Promise<boolean> => {
  const codeResponse = await fetchFindStrapi<applicationType[]>(
    "applications",
    "code",
    code,
    parameters
  );
  return codeResponse.length > 0;
};

export type applicationType = {
  code?: string;
  recipient: recipientType;
  picture?: any;
  coverLetter: coverLetterType;
} & defaultApplicationType & { [key: string]: any };

export type defaultApplicationType = {
  profile: profileType;
  experience: experienceType;
};

export type profileType = {
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
} & { [key: string]: any };

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
} & { [key: string]: any };

export enum locales {
  English = "en-GB",
  German = "de-DE",
}

export type portfolioType = {
  header?: headerType;
  aboutMe?: textElementType;
  skillList: tagListType;
  toLearnList: textElementType;
  nowListening: nowPlayingType;
};

export type headerType = {
  text: string;
  highlight: string;
};

export type nowPlayingType = {
  lastFMUsername: string;
  fallbackUrl: string;
};

export type textElementType = {
  title: string;
  body: string;
};

export type tagListType = {
  leftList: tagType[];
  leftTitle: string;
  middleList: tagType[];
  middleTitle: string;
  rightList: tagType[];
  rightTitle: string;
  title: string;
};

export type tagType = {
  id: number;
  title: string;
  colour: string;
  npmLink: string;
  githubLink: string;
  webLink: string;
  link: boolean;
  slug: string;
  projects: projectType[];
};

export type projectType = {
  id: number;
  title: string;
  description: string;
  thumbnail: { url: string };
  thumbnailBase?: string;
  tags: tagType[];
  status: projectStateType;
  url: string;
  repoUrl: string;
  slug: string;
  content: string;
};

export enum projectStateType {
  "work in progress",
  completed,
  planned,
  abandoned,
  paused,
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
