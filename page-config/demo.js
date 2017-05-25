// 这个文件不要用ES6语法!!!
module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'demo page-dir',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}demo.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}demo.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
