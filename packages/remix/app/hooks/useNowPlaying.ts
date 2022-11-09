
import { useEffect, useState } from 'react'
import type { lastFMResponse, lastFMTrack } from '~/api/lastFM';


export default function useNowPlaying(username: string) {
  const [song, setSong] = useState<lastFMTrack | null>();
  useEffect(() => {
    const update = async () => {
      try {
        const result = await fetch("/api/nowPlaying/" + username)
        const songs: lastFMResponse = await result.json()
        if("recenttracks" in songs) {
          if(("@attr" in songs.recenttracks.track[0] || ("date" in songs.recenttracks.track[0] && (new Date(songs.recenttracks.track[0].date["#text"]).getTime()) < (new Date().getTime() - 120 * 1000)))) {
            setSong(songs.recenttracks?.track[0])
          }
        }
        else if(!("error" in songs)) {
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

