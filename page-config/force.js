module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'force',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}force.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}force.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
