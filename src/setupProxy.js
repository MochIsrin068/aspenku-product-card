const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
   app.use(
      '/api/v1',
      createProxyMiddleware({
         target: process.env.REACT_APP_API_BASE_URL_PROXY,
         changeOrigin: true,
         pathRewrite: {
            '^/api/v1': '/',
         },
      })
   )
   app.use(
      '/api/v3',
      createProxyMiddleware({
         target: process.env.REACT_APP_API_BASE_URL_PROXY_CORE,
         changeOrigin: true,
         pathRewrite: {
            '^/api/v3': '/',
         },
      })
   )
}
