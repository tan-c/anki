import { Quill } from 'react-quill';

const Inline = Quill.import('blots/inline');

class SpanEmbed extends Inline {
  static create(value) {
    const node = super.create();
    node.setAttribute('style', 'background-color:red; color: white');
    node.setAttribute('anki-id', value['anki-id']);
    return node;
  }

  static value(node) {
    return { 'anki-id': node.getAttribute('anki-id') };
  }

  static formats(node) {
    return { 'anki-id': node.getAttribute('anki-id') };
  }
}

SpanEmbed.blotName = 'inline-span';
SpanEmbed.tagName = 'span';
// SpanEmbed.className = 'inline-span';

Quill.register(SpanEmbed);
// let Embed = Quill.import ('blots/embed');
//
// class SpanEmbed extends Embed {
//   static create(value) {
//     let node = super.create(value);
//     // give it some margin
//     node.setAttribute('style', "background-color:red; color: white");
//     node.setAttribute('data-proc', value.value);
//     node.innerHTML = value.text;
//     return node;
//   }
//
//   static formats(node) {
//     return {
//       'data-proc': node.getAttribute('data-proc')
//     };
//   }
// }
//
// SpanEmbed.blotName = 'embed-span';
// SpanEmbed.className = 'embed-span';
// SpanEmbed.tagName = 'span';
//
// Quill.register({'formats/embed-span': SpanEmbed});

export default Quill;
