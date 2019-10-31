const API_HOST = {
  development: process.env.API_HOST || 'http://localhost:3001',
  production: 'http://api.climatefuture.io',
}[process.env.NODE_ENV];

if (!API_HOST) {
  throw new Error(`No API host for ${process.env.NODE_ENV}`);
}

module.exports = {
  env: {
    API_HOST: API_HOST,
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  },
};
