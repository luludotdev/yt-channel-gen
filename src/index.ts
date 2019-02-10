import fetch from 'node-fetch'

/**
 * Get the Uploads playlist for a channel ID
 */
export const getUploadsPlaylist: (
  apiKey: string,
  channelID: string
) => Promise<string> = async (apiKey, channelID) => {
  const url = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelID}&part=contentDetails`
  const resp = await fetch(url)

  const body = await resp.json()
  return body.items[0].contentDetails.relatedPlaylists.uploads
}

/**
 * Get all Video IDs for a YouTube Channel
 */
export const getVideoIDs: (
  apiKey: string,
  channelID: string,
  perPage?: number
) => AsyncIterableIterator<string> = async function* getVideos(
  apiKey,
  channelID,
  perPage = 50
) {
  const uploadsPlaylist = await getUploadsPlaylist(apiKey, channelID)

  let pageToken = ''
  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?key=${apiKey}&playlistId=${uploadsPlaylist}&part=contentDetails&maxResults=${perPage}`

  while (true) {
    const resp = await fetch(
      `${url}${pageToken ? `&pageToken=${pageToken}` : ''}`
    )

    const body = await resp.json()
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
