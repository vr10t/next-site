// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  webpack: (config, { isServer }) => {
    // if (!isServer) {
    //   // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
    //   config.resolve.fallback = {
    //     fs: false,
    //     child_process: false,
    //     tls: false,
    //     net: false,

    //   };
    // }
    config.experiments = { layers: true };
    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  // silent: true, // Suppresses all logs
  // // For all available options, see:
  // // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
