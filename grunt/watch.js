module.exports = {
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
};
