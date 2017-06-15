const NSHTMLElement = require('./NSHTMLElement');

const {Button} = require('ui/button');

module.exports = class NSButton extends NSHTMLElement {

  static get observedAttributes() {
    return ['class', 'tap', 'text'];
  }

  constructor(...args) {
    super(...args);
    this.ns = new Button();
  }
};
