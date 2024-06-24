import { Api } from 'traq-bot-ts'

const token = process.env.TRAQ_ACCESS_TOKEN
if (!token) throw new Error('token is required')

  export const api  = new Api({ baseApiParams: {headers: {Authorization: `Bearer ${token}`}} })
