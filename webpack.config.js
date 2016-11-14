module.exports = {
     entry: './index.js',
     output: {
         path: './dist',
         filename: 'app.bundle.js'
     },
     resole: {
       extensions: ['', '.js', '.jsx']
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
     devServer: {
       inline: true,
       port:8080,
       historyApiFallback: true
     }
 }
