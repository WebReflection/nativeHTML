const NSHTMLElement = require('./NSHTMLElement');

const {ActionBar} = require('ui/action-bar');

module.exports = class NSActionBar extends NSHTMLElement {

  static get observedAttributes() {
    return ['class', 'icon', 'title'];
  }

  constructor(...args) {
    super(...args);
    this.ns = new ActionBar();
  }

};
