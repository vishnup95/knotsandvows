const packageJson = require('../package.json');
process.env.VERSION = packageJson.version;

const BAKED_IN_ENV_VARS = ['NODE_ENV', 'PUBLIC_URL', 'VERSION', 'API_HOST', 'API_PORT', 'GOOGLE_CLIENT_ID','GOOGLE_SITE_VERIFICATION',
'GOOGLE_MAP_KEY', 'GA_TRACKING_ID', 'FACEBOOK_APP_ID', 'FULLSTORY_ORG_ID', 'GTM_ID','CONVERSION_ID'];

function getAppEnv() {
  const raw = Object.keys({}).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: process.env.PUBLIC_URL,
      VERSION: process.env.VERSION,
      API_HOST: process.env.API_HOST,
      API_PORT: process.env.API_PORT,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
      GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
      GA_TRACKING_ID: process.env.GA_TRACKING_ID,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      FULLSTORY_ORG_ID: process.env.FULLSTORY_ORG_ID,
      GTM_ID: process.env.GTM_ID,
      CONVERSION_ID:process.env.CONVERSION_ID
    }
  );

  const forWebpackDefinePlugin = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      if (BAKED_IN_ENV_VARS.includes(key)) {
        env[key] = JSON.stringify(raw[key]);
      } else {
        env[key] = `process.env.${key}`;
      }
      return env;
    }, {})
  };

  const forIndexHtml = JSON.stringify({
    env: raw
  });
  return { raw, forIndexHtml, forWebpackDefinePlugin };
}

module.exports = {
  getAppEnv
};
