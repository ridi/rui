module.exports = {
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
      fontHeight: 1024,
      descent: 64
    }
  }
};
