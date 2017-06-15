const NSHTMLElement = require('./NSHTMLElement');

const {Page} = require('ui/page');

module.exports = class NSPage extends NSHTMLElement {

  static get observedAttributes() {
    return [];
  }

  appendChild(child) {
    if (child.nodeType === 1) {
      super.appendChild(child);
      this.ns.content = child.ns;
    }
    return child;
  }

};
