// 这个文件不要用ES6语法!!!
module.exports = function (envData, projectData) {

    var isDev = envData.__DEV__;
    var jsExt = `${isDev ? '.' : '.min.'}js`;
    var publicPrefix = projectData.__PUBLIC_PREFIX__;
    var projectPrefix = projectData.__PROJECT_PREFIX__;

    return {
        // 全局通用`css`库
        publicCSS: [
            'antd/2.7.2/dist/antd.min.css',
            '//at.alicdn.com/t/font_tcp3x4qhuth85mi.css'

        ].map(function(url){
            if(url.indexOf('//') > -1) {
              return `<link rel="stylesheet" href="${url}">`
            } else {
              return `<link rel="stylesheet" href="${publicPrefix + url}">`
            }
        }).join(''),

        // 页面私有`css`
        privateCSS: '',

        // 全局通用`js`库, 位于页面私有`js`之前
        publicJS: [
            `${publicPrefix}js/react/15/react${jsExt}`,
            `${publicPrefix}js/react/15/react-dom${jsExt}`,
            `${publicPrefix}mobx/3.1.0/lib/mobx.umd${jsExt}`,
            `${publicPrefix}mobx-react/4.1.0/index${jsExt}`,

            // antd太大了，开发环境也用min吧
            `${publicPrefix}antd/2.7.2/dist/antd.min.js`,
            `${publicPrefix}lodash/4.17.4/lodash${jsExt}`,

            // 通用chunk，不用加入`.min`
            `${projectPrefix}common.js`,

            //d3-v4版本
            'https://d3js.org/d3.v4.min.js'
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),

        // 页面私有`js`
        privateJS: ''
    }
}
