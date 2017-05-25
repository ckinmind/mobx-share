module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'mobx',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}mobx.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}mobx.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
