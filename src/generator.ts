import { getUploadsPlaylist } from './playlist.js'
import { playlistVideos } from './videos.js'

export const createGenerator: (
  apiKey: string
) => (
  channelID: string,
  perPage?: number
) => AsyncIterableIterator<string> = apiKey =>
  async function* (channelID, perPage = 50) {
    const uploads = await getUploadsPlaylist(apiKey, channelID)

    let pageToken: string | undefined
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const [videos, nextPage] = await playlistVideos(
        apiKey,
        uploads,
        pageToken,
        perPage
      )

      for (const video of videos) {
        yield video
      }

      pageToken = nextPage
      if (pageToken === undefined) break
    }
  }
