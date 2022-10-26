
import { useEffect, useState } from 'react'
import type { lastFMResponse, lastFMTrack } from '~/api/lastFM';


export default function useNowPlaying(username: string) {
  const [song, setSong] = useState<lastFMTrack | null>();
  useEffect(() => {
    const update = async () => {
      try {
        const result = await fetch("/api/nowPlaying/" + username)
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
  },[username])
  return song;
}

