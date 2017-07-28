
module.exports = {
  bootstrapVersion: 3,
  styleLoaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  styles: {

    // SCSS Mixins
    mixins: true,

    // Reset and dependencies
    normalize: true,
    print: true,
    glyphicons: true,

    // Core CSS
    scaffolding: true,
    type: true,
    code: true,
    grid: true,
    tables: true,
    forms: true,
    buttons: true,

    // Components
    'component-animations': true,
    dropdowns: true,
    'button-groups': true,
    'input-groups': true,
    navs: true,
    navbar: true,
    breadcrumbs: true,
    pagination: true,
    pager: true,
    labels: true,
    badges: true,
    jumbotron: true,
    thumbnails: true,
    alerts: true,
    'progress-bars': true,
    media: true,
    'list-group': true,
    panels: true,
    wells: true,
    'responsive-embed': true,
    close: true,

    // Components with Javascript (may cause problems with React due to JQuery)
    modals: true,
    tooltip: true,
    popovers: true,
    carousel: true,

    // Utility classes
    utilities: true,
    'responsive-utilities': true
  },

  // Bootstrap scripts
  // Any script that modifies the DOM other than React may cause problems with React due to state keeping
  // Seems like this is ignored...
  scripts: {
    affix: false,
    alert: false,
    button: false,
    carousel: false,
    collapse: false,
    dropdown: false,
    modal: false,
    popover: false,
    scrollspy: false,
    tab: false,
    tooltip: false,
    transition: false
  }
};
