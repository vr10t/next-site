


module.exports = {
  env: {
    API_ROUTE_SECRET:'ojHsarem2O3wgHbfdQ44ho8eXXPKwsuMk4BMRbfrGnXcgneCvILf9RHUY94GIlao',
  },
  images:{
    domains: ['lh3.googleusercontent.com'],
  },

  webpack: (config, ) => {
    // 
    config.experiments = { layers: true };
    return config;
  },
};
