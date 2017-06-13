const {Document, Element, HTMLElement} = require('basichtml');
Element.VOID_ELEMENT = /ActivityIndicator|Button|Image|Label|Progress|TextField/;
let document;
if ('document' in global) document = global.document;
global.document = new Document();
const hyperHTML = require('hyperhtml');
if (document) global.document = document;

// <Button ios:text="foo" android:text="bar" />
const btn = hyperHTML.document.createElement('Button');
btn.setAttribute('ios:text', 'foo');
btn.setAttribute('android:text', 'bar');
console.log(btn.outerHTML);

module.exports = class NativeHTML {

  constructor(options) {
    this.document = new Document();
    this.customElements = document.customElements;
  }

  wire(...rest) {
    document = hyperHTML.document;
    hyperHTML.document = this.document;
    const result = hyperHTML.wire(...rest);
    hyperHTML.document = document;
    return result;
  }

};
