module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'pie',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}pie.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}pie.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
