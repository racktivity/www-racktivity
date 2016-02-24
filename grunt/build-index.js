// Reference: https://gist.github.com/sebz/efddfc8fdcb6b480f567
// Edits:
//      1. change double quotes to single quotes
//      2. I've created var WEBSITE_PATH and used it twice.
//      3. pass JSON.stringify() indentation parameter to format index file 

var toml = require('toml'),
    S = require('string'),
    path = require('path');

var WEBSITE_PATH = 'www.racktivity.com';
var CONTENT_PATH_PREFIX = path.join(WEBSITE_PATH, 'content');

module.exports = function(grunt) {
    return function() {
        var filesCount = 0;
        grunt.log.writeln('Build pages index');

        var indexPages = function() {
            var pagesIndex = [];

            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln('Parse file:',abspath);
                pagesIndex.push(processFile(abspath, filename));
            });

            return pagesIndex;
        };

        var processFile = function(abspath, filename) {
            var pageIndex;
            filesCount ++;

            if (S(filename).endsWith('.html')) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight('.html').s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split('+++');
            var frontMatter;
            try {
                frontMatter = toml.parse(content[1].trim());
            } catch (e) {
                conzole.failed(e.message);
            }

            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight('.md').s;
            // href for index.md files stops at the folder name
            if (filename === 'index.md') {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            /*
            * IMPORTANT:
            * I made this to remove all expressions like:
            * [image](/images/datasign-logo_0.jpg)
            * [Google Maps](http://maps.google.ch?q=%2C+%2C+%2C+ch)
            * [www.datasign.ch](http://www.datasign.ch)
            */
            var content = content[2].replace(/\[[a-zA-Z\s\.\-\/\:\@]+\]\([a-zA-Z0-9\/\-\_\.\:\/\+\=\%\?\#]+\)/ig, '')

            /*
            * Here we remove some terms from urls
            * example: /post/benefits-racktivity-energyswitch-pdus => /benefits-racktivity-energyswitch-pdus
            */
            var skippedFolders = ['/post'];
            skippedFolders.forEach(function(folder) {
                if (S(href).startsWith(folder)) {
                    href = href.replace(folder, ''); // remove it
                }
            });

            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.tags,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        grunt.file.write(WEBSITE_PATH + '/static/js/lunr/PagesIndex.json', JSON.stringify(indexPages(), null, 2));
        grunt.log.ok('Index built:', filesCount, 'file(s) processed');
    };
};