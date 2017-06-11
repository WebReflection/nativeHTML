const Document = require('./src/Document');
const document = new Document();
global.document = document;
const hyperHTML = require('hyperhtml');
// delete global.document;

var div = document.createElement('div');
var attr = document.createAttribute('test');
attr.value = 'va"l\'u&';
div.setAttributeNode(attr);
div.appendChild(document.createElement('p')).appendChild(document.createTextNode(' text '));
div.appendChild(document.createElement('br'));
div.appendChild(document.createComment(' comment '));

document.documentElement.appendChild(div);

var fragment = document.createDocumentFragment();

fragment.appendChild(document.createElement('p')).textContent = 'first';
fragment.appendChild(document.createElement('p')).textContent = 'second';

fragment.childNodes[0].id = 'test-id';

div.appendChild(fragment);

var other = document.createElement('div');
other.appendChild(div.childNodes[0]);

div.setAttribute('class', 'd');

div.append('a', 'b', 'c');

const render = hyperHTML.bind(document.createElement('div'));

const update = (render, model) => render`
  <div class="${model.class}"> ${model.text} </div>
  <ul>${model.list.map(i => hyperHTML.wire()`<li>${i}</li>`)}</ul>
`;

console.log(update(render, {
  text: 'Hello hyperHTML',
  class: 'test a b',
  list: [1, 2, 3]
}).outerHTML);

/*
console.log(document.documentElement.innerHTML);

document.documentElement.innerHTML = document.documentElement.innerHTML;

console.log(document.documentElement.innerHTML);
console.log(other.outerHTML);
*/

