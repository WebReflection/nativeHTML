module.exports = customElements => {

  customElements.define('ActionBar', require('./ActionBar'));
  customElements.define('Button', require('./Button'));
  customElements.define('Label', require('./Label'));
  customElements.define('Page.actionBar', require('./Page.actionBar'));
  customElements.define('StackLayout', require('./StackLayout'));

  return customElements;

};