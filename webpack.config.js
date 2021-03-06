const path = require('path');
/*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    /*入口*/
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath : '/'
    },
     module: {
	     rules: [
         {
	         test: /\.js$/,
	         use: ['babel-loader?cacheDirectory=true'],
	         include: path.join(__dirname, 'src')
	     },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        }
        ]
 	},
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
         filename: '[name].[contenthash:5].css',
         allChunks: true
     })
    ],

};