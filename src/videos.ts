import axios from 'axios'
import { type ContentDetails, type PagedResponse } from './http.js'

interface VideoDetails {
  videoId: string
  videoPublishedAt: string
}

type PartialVideos = readonly [
  videos: readonly string[],
  nextPage: string | undefined
]

export const playlistVideos: (
  apiKey: string,
  playlist: string,
  pageToken?: string,
  perPage?: number
) => Promise<PartialVideos> = async (
  apiKey,
  playlist,
  pageToken,
  perPage = 50
) => {
  const query = new URLSearchParams()
  query.set('key', apiKey)
  query.set('playlistId', playlist)
  query.set('part', 'contentDetails')
  query.set('maxResults', perPage.toString())
  if (pageToken) query.set('pageToken', pageToken)

  type Response = PagedResponse<ContentDetails<VideoDetails>>
  const resp = await axios.get<Response>(
    'https://www.googleapis.com/youtube/v3/playlistItems',
    {
      params: query,
    }
  )

  const videos = resp.data.items.map(item => item.contentDetails.videoId)
  return [videos, resp.data.nextPageToken ?? undefined]
}
