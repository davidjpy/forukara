const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@common': path.resolve(__dirname, 'src/common')
    },
  },
};