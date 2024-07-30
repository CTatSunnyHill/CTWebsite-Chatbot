const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(createProxyMiddleware('/api', {target: "http://backend:3001/"}))
}

// if using Docker change localhost to backend