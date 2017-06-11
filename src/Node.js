const removeFromParent = (parentNode, child) => {
  const cn = parentNode.childNodes;
  cn.splice(cn.indexOf(child), 1);
};

const resetParent = (parentNode, node) => {
  if (node.parentNode && node.parentNode !== parentNode) {
    removeFromParent(node.parentNode, node);
  }
  node.parentNode = parentNode;
};

const stringifiedContent = el => {
  switch(el.nodeType) {
    case 1:
    case 11: return el.textContent;
    case 3: return el.data;
    default: return '';
  }
};

module.exports = class Node {

  constructor(ownerDocument) {
    this.ownerDocument = ownerDocument;
    this.childNodes = [];
  }

  appendChild(node) {
    if (node.nodeType === 11) {
      node.childNodes.forEach(this.appendChild, this);
      node.childNodes.splice(0, node.childNodes.length);
    } else {
      const i = this.childNodes.indexOf(node);
      if (-1 < i) this.childNodes.splice(i, 1);
      else resetParent(this, node);
      this.childNodes.push(node);
    }
    return node;
  }

  hasChildNodes() {
    return 0 < this.childNodes.length;
  }

  insertBefore(node, child) {
    if (node.nodeType === 11) {
      node.childNodes.forEach(node => this.insertBefore(node, child));
      node.childNodes.splice(0, node.childNodes.length);
    } else {
      const i = this.childNodes.indexOf(child);
      resetParent(this, node);
      this.childNodes.splice(i, 0, node);
    }
    return node;
  }

  removeChild(child) {
    resetParent(null, child);
    return child;
  }

  replaceChild(node, child) {
    if (node.nodeType === 11) {
      this.insertBefore(node, child);
      this.removeChild(child);
    } else {
      const i = this.childNodes.indexOf(child);
      this.childNodes.splice(i, 1, node);
      resetParent(null, child);
    }
    return child;
  }

  get firstChild() {
    return this.childNodes[0];
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1];
  }

  get nextSibling() {
    const parent = this.parentNode;
    return parent ?
      (parent.childNodes[parent.indexOf(this) + 1] || null) :
      null;
  }

  get previousSibling() {
    const parent = this.parentNode;
    return parent ?
      (parent.childNodes[parent.indexOf(this) - 1] || null) :
      null;
  }

  get textContent() {
    switch (this.nodeType) {
      case 1:
      case 11: return this.childNodes.map(stringifiedContent).join('');
      case 2: return this.value;
      case 3:
      case 8: return this.data;
      default: return null;
    }
  }

  set textContent(text) {
    switch (this.nodeType) {
      case 1:
      case 11:
        this.childNodes.splice(0, this.childNodes.length);
        const node = this.ownerDocument.createTextNode(text);
        node.parentNode = this;
        this.childNodes.push(node);
        break;
      case 2:
        this.value = text;
        break;
      case 3:
      case 8:
        this.data = text;
        break;
    }
  }

};
