module.exports = {
    mode: 'development',
    watch: true,
    entry: ['./src/index.js', './src/firebase.js', './src/responsive-tables.js'],
    output: {
      filename: 'main.js',
      path: __dirname + '/dist',
    },
  };