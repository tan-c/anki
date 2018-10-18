const configKeyboard = (quillRef, Delta) => {
  // quillRef.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
  //   console.log('==🔥🔥=== node.innerText ===🔥🔥==');
  //   console.log(node.data);
  //   // console.log("==🔥🔥=== node ===🔥🔥==");
  //   // console.log(node.textContent);
  //   node.setAttribute('style', {});
  //   return new Delta().insert(node.data);
  // });

  quillRef.keyboard.addBinding({
    key: 'j',
    ctrlKey: true,
    shortKey: true,
  }, (range, context) => {
    // const styles = quillRef.getFormat(range);
    if (context.format['code-block']) {
      quillRef.formatLine(range, {
        'code-block': false,
      });
    } else {
      quillRef.formatLine(range, {
        'code-block': true,
      });
    }
  });

  [1, 2, 3, 4].forEach((k) => {
    quillRef.keyboard.addBinding({
      key: k.toString(),
      ctrlKey: true,
      shortKey: true,
    }, (range, context) => {
      const styles = quillRef.getFormat(range);
      if (styles.header === k) {
        quillRef.formatLine(range, {
          header: false,
        });
      } else {
        quillRef.formatLine(range, {
          header: k,
        });

        // FIXME: not quite working, setting color will restore size
        // quillRef.formatText(0, range.index, {
        //   color: 'red',
        //   font: 24,
        // header: k,
        // });
      }
    });
  });

  quillRef.keyboard.addBinding({
    key: 'h',
    ctrlKey: true,
    shortKey: true,
  }, (range, context) => {
    const styles = quillRef.getFormat(range);
    if (styles.color === 'white') {
      quillRef.formatText(range, {
        background: false,
        color: 'black',
      });
    } else {
      quillRef.formatText(range, {
        background: 'red',
        color: 'white',
      });
    }
  });

  quillRef.keyboard.addBinding({
    key: 'o',
    ctrlKey: true,
    shortKey: true,
  }, (range, context) => {
    if (context.format.list) {
      quillRef.formatLine(range, 'list', '');
    } else {
      quillRef.formatLine(range, {
        list: 'ordered',
      });
    }
  });

  quillRef.keyboard.addBinding({
    key: 'u',
    ctrlKey: true,
    shortKey: true,
  }, (range, context) => {
    if (context.format.list) {
      quillRef.formatLine(range, 'list', '');
    } else {
      quillRef.formatLine(range, {
        list: 'bullet',
      });
    }
  });

  return quillRef;
};

module.exports = configKeyboard;
