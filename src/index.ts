import { Axios } from 'axios'

const axios = new Axios({
  baseURL: 'https://www.googleapis.com/youtube/v3',
})

export const createGenerator = (apiKey: string) => {
  /**
   * Get the Uploads playlist for a channel ID
   */
  const getUploadsPlaylist: (
    channelID: string
  ) => Promise<string> = async channelID => {
    const url = `/channels?key=${apiKey}&id=${channelID}&part=contentDetails`
    const { data: body } = await axios.get(url)

    return body.items[0].contentDetails.relatedPlaylists.uploads
  }

  /**
   * Get all Video IDs for a YouTube Channel
   */
  const getVideoIDs: (
    channelID: string,
    perPage?: number
  ) => AsyncIterableIterator<string> = async function* (
    channelID,
    perPage = 50
  ) {
    const uploadsPlaylist = await getUploadsPlaylist(channelID)

    let pageToken = ''
    const url = `/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylist}&part=contentDetails&maxResults=${perPage}`

    while (true) {
      const { data: body } = await axios.get(
        `${url}${pageToken ? `&pageToken=${pageToken}` : ''}`
      )

      pageToken = body.nextPageToken

      for (const item of body.items) {
        const {
          contentDetails: { videoId },
        } = item
        yield videoId
      }

      if (pageToken === undefined) break
    }
  }

  return getVideoIDs
}
