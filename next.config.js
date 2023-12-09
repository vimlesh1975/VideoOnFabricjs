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

    // Add CSS modules support
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });

    // Additional webpack configurations go here

    return config;
  },
};
