// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Add loaders for specific file types
    config.module.rules.push({
      test: /\.(node)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    });

    // Additional webpack configurations go here

    return config;
  },
};
