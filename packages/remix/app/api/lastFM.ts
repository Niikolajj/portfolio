

export const fetchLastFM = async (username?: string): Promise<lastFMResponse> => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`;
  const result = await fetch(url)
  const songs: lastFMResponse = await result.json()
  return songs
}

export type lastFMResponse = {
  recenttracks: {
    "@attr": lastFMUser
    track: lastFMTrack[]
  }
}
type lastFMUser = {
  page:number,
  perPage: number,
  total: number,
  totalPages: number
  user: string
}

export type lastFMTrack = {
  "@attr"?: { nowPlaying: boolean },
  album: {mbid: string, "#text": string},
  artist: {mbid: string, "#text": string},
  mbid: string,
  name: string,
  streamable: number,
  url: string
}