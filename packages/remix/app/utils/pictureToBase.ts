export const pictureToBase = async (url: string): Promise<string> => {
  try {
    const pictureUrl = new URL(url ?? "", process.env.STRAPI_URL_BASE ?? "");
    const response = await fetch(pictureUrl);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    return buffer.toString("base64");
  } catch {
    return "";
  }
};

export const baseToSrc = (baseString: string): string => {
  return `data:image/png;base64, ${baseString}`;
};
