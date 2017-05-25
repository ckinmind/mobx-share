module.exports = function (envData, projectData, global) {
    return {
        pageTitle: '<%component-name%>',
        privateCSS: [
            `${projectData.__PROJECT_PREFIX__}<%component-name%>.css`,
        ].map(function(url) {
            return `<link rel="stylesheet" href="${url}">`
        }).join(''),

        privateJS: [
            `${projectData.__PROJECT_PREFIX__}<%component-name%>.js`,
        ].map(function(url) {
            return `<script src="${url}"></script>\n    `
        }).join(''),
    }
}
