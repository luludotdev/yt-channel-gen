export interface PagedResponse<T> {
  kind: string
  etag: string
  nextPageToken?: string

  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }

  items: T[]
}

export interface ContentDetails<T> {
  kind: string
  etag: string
  id: string

  contentDetails: T
}
