module.exports = {
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
        src: ['rui.less', 'page.less', 'navigation.less', 'rui.e.less'],
        dest: 'css/',
        ext: '.css',
        extDot: 'last'
      }
    ]
  }
};
