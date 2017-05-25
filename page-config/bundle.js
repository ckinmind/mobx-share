module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'bundle',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}bundle.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}bundle.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
