import axios from 'axios'
import url from 'url'

import {
  HEADER_SET_COOKIE,
  HEADER_COOKIE,
  HEADER_HOST
} from './headers'

export default class Client {
  constructor ({
    // cookie-store instance
    store,
    // default headers
    headers,
    referrer
  }) {

    this._store = store
    this._headers = headers || {}

    if (referrer) {
      this._headers[HEADER_REFERER] = referrer
    }
  }

  request (options) {
    if (Object(options) !== options) {
      throw new TypeError('options must be an object')
    }

    options = {
      ...options
    }

    const h = options.headers || {}
    const headers = options.headers = {
      ...options.headers,
      ...this._headers
    }

    const u = options.url
    const {
      hostname,
      pathname
    } = url.parse(u)

    const cookie = this._store.from({
      domain: hostname,
      path: pathname
    })
    const cookieHeader = cookie.toHeader()

    if (cookieHeader) {
      headers[HEADER_COOKIE] = cookieHeader
    }

    headers[HEADER_HOST] = hostname

    return axios.request(options)
    .then(response => {

      const {
        headers
      } = response

      const setCookieHeader = headers[HEADER_SET_COOKIE]
      if (setCookieHeader) {
        cookie.setCookie(setCookieHeader)
      }

      return response
    })
  }
}
