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

A simple but powerful http agent to imitate requests from browsers.

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

const document = await session.visit('http://dangerous.com')

const {
  ajax,
  cookies
} = document

const session_id = cookies.get('SESSION_ID')
// 'eeda3d5a-38bc-4111-95de-6789c9957286'

const url = 'http://dangerous.com/403-if-direct-access-without-sessionid-cookie'

const {
  status
} = await ajax.get(url)

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

## Document

- **response**
- **ajax**
- **cookies**

## License

MIT
