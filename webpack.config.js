var config = {
   entry: './main.js',
   output: {
      path: __dirname + "/dist",
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      host: 'crud-react.herokuapp.com',
      port: process.env.PORT || 80
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
