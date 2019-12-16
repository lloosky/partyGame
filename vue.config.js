module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/manager/' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
};
