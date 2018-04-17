
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");//外部插件要单独下载然后require；这个插件可以吧sass提取出来转成css而不是打包到js里面

var BUILD_PATH = path.resolve(__dirname, 'dist');
var PATH = path.resolve(__dirname, 'src/js/zMusic.js');

//写一个判断啥时候使用代码压缩


module.exports = {
    entry: PATH,
    output: {
        path: BUILD_PATH,
        //包规范格式
        libraryTarget: 'umd',
        library: "zMusic",
        umdNamedDefine: true,
        filename: 'zMusic.min.js'
    },
    // devtool: 'source-map', //每次处理生成.map文件便于在浏览器debug（压缩后的的代码不适与debug）
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({  //这是一个吧js代码压缩的插件；该插件webpack提供不需要下载直接 webpack.optimize.UglifyJsPlugin；因为上面已经require了webpack
        //     sourceMap: false
        // }),
        new ExtractTextPlugin({   //该插件用于吧sass，lass，css 等文件淡出提取出来不是打包到js里面
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            //下面这段配置用了上面加载ExtractTextPlugin插件可以吧sass抽离出来
            //意思是执行webpack后会单独产生一个css文件供index.html引用
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }]
                })
            },
            //下面这段配置没有用插件只是单纯的吧sass问价按照'sass-loader','css-loader','style-loader'处理
            //最后的文件打包到js文件一起index.html只要引用js文件就可以（入口js文件必须require或者importsass文件）
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // }
        ]
    }
};
