
const webpack = require("webpack"),
      path = require("path")

// CopyWebpackPlugin = require('copy-webpack-plugin'),
ExtractTextPlugin = require("extract-text-webpack-plugin");
// WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    entry: path.resolve(__dirname, ' /src/js/zMusic.js '),
    output: {
        path:path.resolve(__dirname, '/dist'),//__dirname获取当前模块的绝对路径
        filename: 'zMusic.min.js'
    },
    // resolve: {
    //     alias: {
    //         test: path.resolve(__dirname, 'test/test.js')
    //     }
    // },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        // new WebpackNotifierPlugin({
        //     title: 'Webpack 编译成功',
        //     contentImage: path.resolve(process.cwd(), './img/avatar.jpeg'),
        //     alwaysNotify: true
        // }),
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: Infinity
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                })
            },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', {
            //             loader: 'less-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         }]
            //     })
            // },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            // {
            //     test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]_[sha512:hash:base64:7].[ext]'
            //         }
            //     }
            // },
            // {
            //     test: /\.html/,
            //     use: {
            //         loader: "html-loader",
            //         options: {
            //             minimize: false,
            //             attrs: false
            //         }
            //     }
            // }
        ]
    }
};
