const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@media': path.resolve(__dirname, 'src/media'),
      '@pages': path.resolve(__dirname, 'src/pages')
    },
  },
};