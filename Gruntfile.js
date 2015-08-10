module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        options: {
          relativeUrls: true,
          plugins: [
            new (require('less-plugin-clean-css'))({compatibility: 'ie8'})
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'less',
            src: ['rui.less', 'page.less', 'navigation.less'],
            dest: 'css/',
            ext: '.css',
            extDot: 'last'
          }
        ]
      }
    },

    webfont: {
      icons: {
        src: 'icon/svg/*.svg',
        dest: 'icon/fonts',
        destCss: 'icon/css',
        options: {
          normalize: true,
          font: 'ruicon',
          htmlDemo: true,
          htmlDemoTemplate: 'icon/templates/ridi_tmpl.html',
          destHtml: 'icon',
          stylesheet: 'less',
          template: 'icon/templates/ridi_tmpl.css',
          types: 'eot,ttf,woff',
          embed: 'ttf,woff',
          fontHeight: 1024,
          descent: 64
        }
      }
    },

    newer: {
      options: {
        /**
         * when changing a less file, we run an addional check on all the *.less files to see if they are @importing a modified *.less file, and if so we include it in the files which less task should execute.
         */
        override: function(details, shouldIncludeCallback) {
          var fs = require('fs');
          var path = require('path');
          var async = require('async');

          var checkFileForModifiedImports = async.memoize(function(filepath, fileCheckCallback) {
            fs.readFile(filepath, 'utf8', function(error, data) {
              var directoryPath = path.dirname(filepath);
              var regex = /@import (?:\([^)]+\) )?"(.+?)(\.less)?"/g;
              var match;

              function checkNextImport() {
                if ((match = regex.exec(data)) === null) {
                  return fileCheckCallback(false); // all @import files has been checked.
                }

                var importFilePath = path.join(directoryPath, match[1] + '.less');
                fs.exists(importFilePath, function(exists) {
                  if (!exists) { // @import file does not exists.
                    return checkNextImport(); // skip to next
                  }

                  fs.stat(importFilePath, function(error, stats) {
                    if (stats.mtime > details.time) { // @import file has been modified, -> include it.
                      fileCheckCallback(true);
                    }
                    else { // @import file has not been modified but, lets check the @import's of this file.
                      checkFileForModifiedImports(importFilePath, function(hasModifiedImport) {
                        if (hasModifiedImport) {
                          fileCheckCallback(true);
                        }
                        else {
                          checkNextImport();
                        }
                      });
                    }
                  });
                });
              }

              checkNextImport();
            });
          });

          // only add override behavior to less tasks.
          if (details.task == 'less') {
            checkFileForModifiedImports(details.path, function(found) {
              shouldIncludeCallback(found);
            });
          }
          else {
            shouldIncludeCallback(false);
          }
        }
      }
    },

    watch: {
      iconfont: {
        files: ['icon/svg/*.svg'],
        tasks: ['webfont:icons', 'newer:less'],
        options: {
          nospawn: true
        }
      },
      styles: {
        files: ['less/**/*.less', 'icon/css/*.less'],
        tasks: ['newer:less'],
        options: {
          nospawn: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['watch']);
};


