module.exports = function (envData, projectData, global) {
    return {
        pageTitle: 'scattering',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}scattering.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}scattering.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
