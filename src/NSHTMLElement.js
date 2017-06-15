const {HTMLElement} = require('basichtml');

const isHyperHTML = /^<!--_hyper_html:\s-\d+;-->$/;

module.exports = class NSHTMLElement extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (isHyperHTML.test(newValue)) return;
    // console.log(this.nodeName, 'changing: ' + name, oldValue, newValue);
    switch (name) {
      case 'class':
        this.ns.className = newValue;
        break;
      default:
        if (typeof newValue === 'function') {
          if (typeof oldValue === 'function') {
            this.ns.off(name, oldValue);
          }
          this.ns.on(name, newValue);
        } else {
          this.ns[name] = newValue;
        }
        break;
    }
  }

  appendChild(child) {
    switch (child.nodeType) {
      case 1:
        if ('ns' in this && 'ns' in child) this.ns.addChild(child.ns);
      case 11:
        return super.appendChild(child);
    }
    return child;
  }

  removeChild(child) {
    if ('ns' in this && 'ns' in child) this.ns.removeChild(child.ns);
    return super.removeChild(child);
  }

};
