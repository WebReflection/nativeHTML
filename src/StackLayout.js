const NSHTMLElement = require('./NSHTMLElement');

const {StackLayout} = require('ui/layouts/stack-layout');

module.exports = class NSStackLayout extends NSHTMLElement {

  static get observedAttributes() {
    return ['class', 'orientation'];
  }

  constructor(...args) {
    super(...args);
    this.shenanigans = Math.random();
    this.ns = new StackLayout();
  }
};
