[![Build Status](https://travis-ci.org/kaelzhang/node-talking-bird.svg?branch=master)](https://travis-ci.org/kaelzhang/node-talking-bird)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/node-talking-bird?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/node-talking-bird)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/talking-bird.svg)](http://badge.fury.io/js/talking-bird)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/talking-bird.svg)](https://www.npmjs.org/package/talking-bird)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/node-talking-bird.svg)](https://david-dm.org/kaelzhang/node-talking-bird)
-->

# talking-bird

A simple but powerful and programable http agent to imitate requests from browsers.

## Install

```sh
$ npm install talking-bird --save
```

## Usage

```js
const browser = require('talking-bird')

// Start a new session
const session = browser.session({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
})

const {
  cookies,
  ajax
} = await session.visit('http://dangerous.com')

const url = 'http://dangerous.com/403-if-direct-access-without-sessionid-cookie'

const {
  status
} = await ajax.request({url})

console.log(status) // 200

// Oh Yeah!
```

## browser.session(options)

Create a brand-new session with everything initialized.

Returns `Session`

**options**

- **userAgent** `String`

## session.visit(url)

Imitate a browser to visit a url, handles header

Returns `Promise.<Document>`

- `Promise.resolve` if the http status indicates successful
- otherwise `Promise.reject`

## Struct: `Document`

- **response** `Object`
- **ajax** `Request`
- **cookies** `Cookie`

## Class: `Request`

## Class: `Cookie`

## License

MIT
