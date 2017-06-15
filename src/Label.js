const NSHTMLElement = require('./NSHTMLElement');

const {Label} = require('ui/label');

module.exports = class NSLabel extends NSHTMLElement {

  static get observedAttributes() {
    return ['class', 'tap', 'text', 'textWrap'];
  }

  constructor(...args) {
    super(...args);
    this.ns = new Label();
  }
};
