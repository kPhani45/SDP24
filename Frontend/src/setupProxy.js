const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // forward calls starting with /api to the backend server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      // you can add pathRewrite here if needed, e.g.:
      // pathRewrite: { '^/api': '' },
    })
  );
};
