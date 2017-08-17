import CookieStore from 'cookie-store'
import Client from './client'

import {
  HTML_REQUEST_HEADERS,
  AJAX_REQUEST_HEADERS
} from './headers'

import url from 'url'

export default class Session {
  constructor ({
    userAgent
  }) {

    this._userAgent = userAgent
    // @type `URL`
    this._currentURL = null
    this._currentURLObject = null
    this._store = new CookieStore
  }

  _absolutizeURL (u) {
    if (!this._currentURL) {
      return u
    }

    if (u.indexOf('/') !== 0) {
      return u
    }

    const parsed = this._currentURLObject
    return `${parsed.protocol}://${parsed.host}${u}`
  }

  visit (u) {
    u = this._absolutizeURL(u)

    return new Client({
      store: this._store,
      headers: HTML_REQUEST_HEADERS,
      referrer: this._currentURL
    }).request({
      url: u,
      responseType: 'text'
    })
    .then(response => {
      this._currentURL = u
      const parsed = this._currentURLObject = url.parse(u)

      return new Document({
        response,
        store: this._store,
        referrer: parsed
      })
    })
  }
}


class Document {
  constructor ({
    store,
    referrer,
    response
  }) {

    const u = referrer.href

    this.ajax = new Client({
      store,
      headers: AJAX_REQUEST_HEADERS,
      referrer: u
    })

    this.response = response
    this.cookies = store.from({
      domain: u.hostname,
      path: u.pathname
    })
  }
}
