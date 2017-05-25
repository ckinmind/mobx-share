module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'partition',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}partition.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}partition.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
