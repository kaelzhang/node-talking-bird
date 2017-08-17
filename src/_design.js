import browser from 'talking-bird'

// Start a new session
const session = browser.session({
  userAgent: 'User-Agent':	'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1'
})

const {
  cookies,
  request,
  // especially for ajax requests
  ajax
} = await session.visit('http://dangerous.com')

const url = 'http://dangerous.com/403-if-direct-access-without-sessionid-cookie'

const {
  status
} = await ajax.request({url})

console.log(status) // 200
