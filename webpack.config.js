module.exports = {
    mode: 'development',
    watch: true,
    entry: ['./src/index.js', './src/firebase.js'],
    output: {
      filename: 'main.js',
      path: __dirname + '/dist',
    },
  };