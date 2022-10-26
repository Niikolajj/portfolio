import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react'


export default function useNowPlaying(username: string) {
  const { apiKey } = useLoaderData();
  const [song, setSong] = useState<lastFMTrack | null>();
  const url = `//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
  useEffect(() => {
    const update = async () => {
      try {
        const result = await fetch(url)
        const songs: lastFMResponse = await result.json()
        if(songs.recenttracks.track[0]["@attr"]) {
          setSong(songs.recenttracks?.track[0])
        }
        else {
          setSong(null)
        }
      } catch (error) {
          setSong(null)
      }

    }
    update()
    const updaterInterval = setInterval(update, 60 * 1000)
    return () => {
      clearInterval(updaterInterval)
    }
  },[url])
  return song;
}

type lastFMResponse = {
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