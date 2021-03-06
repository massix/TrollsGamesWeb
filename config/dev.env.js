'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: '"https://staging.massi.rocks"',
  REDIRECT_URL: '"https://web.dev.massi.rocks"'
})
