


module.exports = {
  webpack: (config, { isServer }) => {
    // 
    config.experiments = { layers: true };
    return config;
  },
};
