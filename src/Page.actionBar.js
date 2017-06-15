const NSHTMLElement = require('./NSHTMLElement');

module.exports = class PageActionBar extends NSHTMLElement {

  appendChild(child) {
    switch(child.nodeName) {
      case 'ActionBar':
        this.ownerDocument.page.actionBar = child.ns;
        break;
    }
    return super.appendChild(child);
  }

};
