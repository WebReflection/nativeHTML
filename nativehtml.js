const {CustomElementRegistry, Document, Element, HTMLElement} = require('basichtml');
Element.VOID_ELEMENT = /ActivityIndicator|Button|Image|Label|Progress|TextField/;
const customElements = require('./src/tns-custom-elements')(new CustomElementRegistry());

let document;
if ('document' in global) document = global.document;
global.document = new Document(customElements);
const hyperHTML = require('hyperhtml');
if (document) global.document = document;

const {Page} = require('ui/page');
const NSPage = require('./src/Page');

module.exports = class NativeHTML extends Page {

  constructor(options) {
    super();
    const document = new Document(customElements);
    document.page = this;
    options.document = document;
    options.render = hyperHTML.bind(document.body);
    options.wire = options.wire;
    if ('init' in options) options.init();
    if ('update' in options) options.update();
    this.content = document.body.lastElementChild.ns;
  }

  wire(...rest) {
    document = hyperHTML.document;
    hyperHTML.document = this.document;
    const result = hyperHTML.wire(...rest);
    hyperHTML.document = document;
    return result;
  }

};
