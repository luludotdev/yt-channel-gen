import axios from 'axios'
import { type ContentDetails, type PagedResponse } from './http.js'

interface ChannelDetails {
  relatedPlaylists: {
    likes: string
    uploads: string
  }
}

export const getUploadsPlaylist: (
  apiKey: string,
  channelID: string
) => Promise<string> = async (apiKey, channelID) => {
  const query = new URLSearchParams()
  query.set('key', apiKey)
  query.set('id', channelID)
  query.set('part', 'contentDetails')

  type Response = PagedResponse<ContentDetails<ChannelDetails>>
  const resp = await axios.get<Response>(
    'https://www.googleapis.com/youtube/v3/channels',
    {
      params: query,
    }
  )

  const channel = resp.data.items[0]
  if (!channel) {
    throw new Error('channel not found')
  }

  return resp.data.items[0].contentDetails.relatedPlaylists.uploads
}
