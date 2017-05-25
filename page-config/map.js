module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'map',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}map.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}map.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
