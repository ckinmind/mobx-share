module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'package',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}package.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}package.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
