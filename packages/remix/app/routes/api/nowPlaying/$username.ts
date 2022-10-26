import type { LoaderFunction } from "@remix-run/node";
import type { lastFMResponse } from "~/api/lastFM";
import { fetchLastFM } from "~/api/lastFM";

export const loader: LoaderFunction = async ({ params }): Promise<lastFMResponse> => {
  const songs = await fetchLastFM(params.username)
  return songs;
}