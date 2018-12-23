let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry : path.join(__dirname,"/Components/src/Root.jsx"),
    output : {

        filename : "bundle.js",
        path : path.join(__dirname,"/public"),
    
    },
    devServer: {
        hot : true,
        contentBase: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'Components')],
        watchContentBase: true,
        historyApiFallback: true,
        compress: true,
        port: 9000
    },
    mode : "development",
    module : {
        rules : [
            {
                test : /\.(css|scss|sass)$/,
                exclude : /node_modules/,
                use : [
                    {loader : 'style-loader'},
                    {loader : 'css-loader'},
                    {loader : 'sass-loader'},
                ]
            },
            {
                test : /\.(js|jsx)$/,
                exclude: /node_modules/,
                use : 'babel-loader'
            },
            {
                test : /\.(woff|jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [{
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/'
                  }
              }]
            }
        ]
    },
    plugins : [
        new webpack.ProgressPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    target : "web"
}