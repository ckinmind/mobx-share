const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require('./package.json')
const _ = require('lodash')

const HOST = "0.0.0.0";
const PORT = 3000;
let commonPlugins = [];

const isDev = process.env.NODE_ENV !== "production";


const pageBasePath = path.join(__dirname, 'page-base')
const pageConfigPath = path.join(__dirname, 'page-config')

// 要创建的页面名称
let pageNames = fs.readdirSync(pageConfigPath).map(function (item) {
    if (!fs.statSync(pageConfigPath + '/' + item).isFile()) {
        console.error(`Page config must be a file: "${pageConfigPath + '/' + item}" is not a file!`)
        process.exit(0)
    }
    return item.split('.')[0]
})

// 过滤掉空的文件名
// 出现原因：系统自动生成.开头的隐藏文件
pageNames = _.filter(pageNames, function(pageName) {
  return !!pageName
})

let entry = {};

pageNames.map(function (name) {
    entry[name] = [
        path.join(__dirname, 'src', `page-${name}`, 'index.js')
    ]
});

// 环境数据
const envData = {
    __DEV__: isDev,
    __PRODUCTION__: !isDev,
};

const projectData = {
    __PUBLIC_PREFIX__: '//cdn.dtwave.com/public/',
    __PROJECT_PREFIX__: isDev ? '/' : '//cdn.dtwave.com/' + pkg.name + '/' + pkg.version + '/',
    __PROJECT_NAME__: pkg.name,
    __VERSION__: pkg.version
}

// 页面基础数据
let pageBaseData = require(path.join(pageBasePath, 'base'));
pageBaseData = typeof pageBaseData === 'function' ? pageBaseData(envData, projectData) : pageBaseData;
// process.exit(0)

module.exports = {
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        compress: true,
        inline: true,
        hot: true,
        port: PORT,
        host: HOST,
        open: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        noInfo: true
    },
    entry: entry,
    output: {
        // path配置只在build时才有用到
        path: path.join(__dirname, 'dist'),

        filename: "[name].js",
        chunkFilename: "[name].[chunkhash:6].chunk.js",

        // publicPath只是dev时用到
        publicPath: '/',
    },
    resolveLoader: {
      moduleExtensions: ["-loader"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel?cacheDirectory"],
                // use: ["babel", "eslint"],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style",
                    use: ["css", "postcss", "stylus"],
                }),
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                use: ['json']
            }
            // {
            //     test: /\.(jpg|jpeg|png|gif|svg)$/,
            //     use: ['file'],
            //     query: {
            //         name: '[name].[hash:8].[ext]'
            //     }
            // }
        ]
    },
    plugins: [
        // 从多个模块中提取共用的模块到common.js
        // https://webpack.js.org/plugins/commons-chunk-plugin/#commons-chunk-for-entries
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),
        new webpack.DefinePlugin(envData),
        new ExtractTextPlugin('[name].css')
    ].concat((function () {


        return pageNames.map(function (pageName) {


          // console.log('privatePageData', path.join(pageConfigPath, pageName))
            // 页面私有数据
            let privatePageData = require(path.join(pageConfigPath, pageName));

            privatePageData = typeof privatePageData === 'function' ? privatePageData(envData, projectData, pageBaseData) : privatePageData;

            // https://github.com/jantimon/html-webpack-plugin#configuration
            return new HtmlWebpackPlugin(Object.assign(
                {
                    // NOTE 不允许配置成绝对路径 `filename`是相对于`webpack`的`output.path`(build时)和`output.publicPath`(dev时)值的
                    filename: isDev ? pageName+'.html' : 'html/' + pageName + '.html',
                    // NOTE 不允许配置成绝对路径 `template`是相对于`webpack`的`resolve.root`值的
                    template: 'page-base/base.html',
                    // 页面自己决定如何插入
                    inject: false,
                    pageName: pageName
                },
                envData,
                projectData,
                pageBaseData,
                privatePageData
            ))
        });
    })()),
    externals: {
        'react': 'var React',
        'react-dom': 'var ReactDOM',
        'mobx': 'var mobx',
        'mobx-react': 'var mobxReact',
        '_': 'var _',
        'antd': 'var antd',
    }
};

if (!isDev) {
    commonPlugins = [

        // new HtmlWebpackPlugin({
        //     filename: "index.html",
        //     template: "wwwindex.html",
        //     inject: true,
        //     hash: true,
        //     minify: {
        //         removeComments: true,
        //         // collapseWhitespace: true,
        //         removeAttributeQuotes: true,
        //         // minifyJS: true,
        //         minifyCSS: true,
        //         minifyURLs: true,
        //     }
        // }),
        // 是否压缩JS 如果不压缩 需要全部注释掉
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: false,
            compress: {
                unused: true,
                dead_code: true,
                pure_getters: true,
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                comparisons: true,
                sequences: true,
                evaluate: true,
                join_vars: true,
                if_return: true,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            quiet: true,
        }),
    ];
} else {
    commonPlugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     debug: true,
        //     options: {
        //         eslint: {
        //             configFile: './.eslintrc',
        //         },
        //     }
        // }),
    ];
    module.exports.devtool = "source-map";
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins);
