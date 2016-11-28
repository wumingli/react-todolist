var path=require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: [
      "webpack/hot/only-dev-server",
      "./js/app.js"
    ],
    output: {
        path: "dist",
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
        new CleanPlugin('dist'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new WebpackMd5Hash(),

        new ExtractTextPlugin("style.[hash].css", {
            allChunks: false,
        }),

        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {
                    warnings: false
                }
            }
        ),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({    //根据模板插入css/js等生成最终HTML
            filename: 'index.html',    //生成的html存放路径，相对于 path
            template: './dist_index.html',
            inject: ['body', 'head'],    //允许插件修改哪些内容，包括head与body
            minify:{    //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        })
    ],
    devServer: {
       hot: true,
       inline: true
    }
 };
