module.exports = {
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
};
