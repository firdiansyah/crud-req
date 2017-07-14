var config = {
   entry: './src/main.js',
   
   output: {
      path: __dirname + "/public",
      filename: 'bundle.js',
   },

   devServer: {
      inline: true,
      port: process.env.PORT || 3000
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
