export const fetchLastFM = async (
  username?: string
): Promise<lastFMResponse> => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`;
  const result = await fetch(url);
  const songs: lastFMResponse = await result.json();
  return songs;
};

export type lastFMResponse = lastFMResponseSongs | lastFMResponseError;

type lastFMResponseSongs = {
  recenttracks: {
    "@attr": lastFMUser;
    track: lastFMTrack[];
  };
};

type lastFMResponseError = {
  message: string;
  error: number;
};

type lastFMUser = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  user: string;
};

export type lastFMTrack = {
  album: { mbid: string; "#text": string };
  artist: { mbid: string; "#text": string };
  mbid: string;
  name: string;
  streamable: number;
  url: string;
} & (lastFMTrackHistoryInfo | lastFMTrackNPInfo);

type lastFMTrackNPInfo = {
  "@attr"?: { nowPlaying: boolean };
};

type lastFMTrackHistoryInfo = {
  date: {
    "#text": string;
    uts: string;
  };
};
