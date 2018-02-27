/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const fs = require('fs-extra');
const { pages } = require('./src/slugmap');

exports.createPages = function ({ boundActionCreators }) {
    const { createPage } = boundActionCreators;
    return new Promise(function (resolve) {
        Object.keys(pages).forEach(page => {
            const translations = pages[page];
            const component = path.resolve(__dirname, 'src', 'pages', `${page}.js`);
            Object.keys(translations).forEach(lang => {
                createPage({
                    path: translations[lang],
                    component,
                    context: { lang, }
                });
            })
        });
        resolve(true);
    });

    exports.onPostBuild = function () {
        console.log('Copying locales');
        fs.copySync(path.join(__dirname, '/src/locales'), path.join(__dirname, '/public/locales'));
    }
};
