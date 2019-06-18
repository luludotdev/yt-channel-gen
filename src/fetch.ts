import fetch, { RequestInfo, RequestInit } from 'node-fetch'

export const createFetch = (baseURL: string) => async (
  url: RequestInfo,
  init?: RequestInit
) => {
  const uri = typeof url === 'string' ? `${baseURL}${url}` : url
  const resp = await fetch(uri, init)

  if (resp.ok) return resp
  else throw new Error(resp.status.toString())
}
