var config = {
   entry: './main.js',
   output: {
      path: __dirname + "/dist",
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2016', 'react']
            }
         },
         {
           test: /\.css/,
           loaders: ['style-loader', 'css-loader']
         }
      ]
   }
}

module.exports = config;
