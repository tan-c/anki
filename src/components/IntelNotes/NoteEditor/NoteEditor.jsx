import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ReactQuill, { Quill } from 'react-quill';
import keydown from 'react-keydown';
import { Map } from 'immutable';

import InputControlledConnected from 'utility-react-component/Form/Input/Controlled';
import { NoteActions, activeNoteSelector } from 'utility-redux/anki/note';
import { FileActions } from 'utility-redux/anki/file';

import { ImageDrop } from '../_vendor/ImageDrop';

/* eslint-disable react/no-multi-comp */
// const globalScope = this;
Quill.register('modules/imageDrop', ImageDrop);

// let Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');
// class PlainClipboard extends Clipboard {
//   convert(html = null) {
//     // if (typeof html === 'string') {
//       this.container.innerHTML = html;
//     // }
//     let text = this.container.innerText;
//     // this.container.innerHTML = '';
//     this.container.setAttribute("style", {});
//     return new Delta().insert(text);
//   }
// }
// Quill.register('modules/clipboard', PlainClipboard, true);

// <span className="ql-color" />
// <select className="ql-color ql-picker ql-color-picker" />
// <span className="ql-background" />
// <select className="ql-background ql-picker ql-color-picker" />

const CustomToolbar = params => (
  <div id={`toolbar${params.index}`} className="toolbar">
    <select className="ql-header">
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
  </div>);

export class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.reactQuillRef = null; // ReactQuill component
    this.reactQuillRef2 = null;

    hljs.configure({ // optionally configure hljs
      languages: ['javascript', 'ruby', 'python', 'java', 'scala', 'bash', 'json', 'html', 'sql'],
    });

    this.state = {
      quillModules1: {
        syntax: true,
        imageDrop: true,
        toolbar: {
          container: '#toolbar1',
        },
      },
      quillModules2: {
        syntax: true,
        imageDrop: true,
        toolbar: {
          container: '#toolbar2',
        },
      },
      activeNoteContent: '',
      activeNoteContent2: '',
      // noteTemplates: [],
      isSavingNote: false,
    };
  }

  componentDidMount() {
    this.attachQuillRefs();
    this.updteActiveNoteContent(this.props.activeNote); // Switching App
  }

  componentWillReceiveProps(nextProps) {
    this.updteActiveNoteContent(nextProps.activeNote); // Initital Loading
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  updteActiveNoteContent(activeNote) {
    if (activeNote.size) {
      if (activeNote.has('content')) {
        this.setState({
          activeNoteContent: activeNote.get('content'),
          activeNoteContent2: activeNote.get('content2'),
        });
      } else {
        this.props.NoteActions.get(activeNote);
      }
    }
  }

  attachQuillRefs = () => {
    if (this.reactQuillRef === null || typeof this.reactQuillRef.getEditor !== 'function' || this.reactQuillRef2 === null || typeof this.reactQuillRef2.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
    this.quillRef = require('./quillConfig')(this.quillRef, Delta);

    this.quillRef2 = this.reactQuillRef2.getEditor();
    this.quillRef2 = require('./quillConfig')(this.quillRef2, Delta);
  }

  // applyTemplate = (event) => {
  //   const selectedTemplate = this.props.noteTemplates.find(n => n._id === event.target.value);
  //   event.preventDefault();
  //   if (confirm('Apply this template?')) {
  //     this.quillRef.clipboard.dangerouslyPasteHTML(0, selectedTemplate.content);
  //     this.saveNoteContent();
  //   }
  // }

  @keydown('command+enter')
  saveNoteContentOnKeydown() {
    this.setState({
      isSavingNote: true,
    });

    // Subtitle Update on updating content
    const { activeNote } = this.props;
    const subtitles = [];
    const regex = /<h2>([^<]*)<\/h2>/g;
    let matches = [];
    while (matches = regex.exec(this.state.activeNoteContent)) { // eslint-disable-line no-cond-assign
      subtitles.push(matches[1]);
    }

    while (matches = regex.exec(this.state.activeNoteContent2)) { // eslint-disable-line no-cond-assign
      subtitles.push(matches[1]);
    }

    const selection = this.reactQuillRef.getEditor().getSelection();
    const oldCursorPos = selection === null ? 0 : selection.index;

    const selection2 = this.reactQuillRef2.getEditor().getSelection();
    const oldCursorPos2 = selection2 === null ? 0 : selection2.index;

    this.props.NoteActions.update(activeNote.merge({
      content: this.state.activeNoteContent,
      content2: this.state.activeNoteContent2,
      subtitles,
    })).then(() => {
      // Cursor should land at right place after saving
      if (oldCursorPos !== 0) {
        this.reactQuillRef.getEditor().setSelection(oldCursorPos);
      } else {
        this.reactQuillRef2.getEditor().setSelection(oldCursorPos2);
      }

      // this.titleInput.blur();
      this.setState({
        isSavingNote: false,
      });
    }).catch((error) => {
      toastr.error(error);
    });
  }

  scrollToTitle = (title) => {
    const titleNodes = document.querySelectorAll('#quill-1 .ql-editor h2');
    const el = document.getElementsByClassName('ql-editor')[0];
    let hasAnswer = false;
    titleNodes.forEach((t) => {
      if (t.innerText === title) {
        el.scrollTop = t.offsetTop;
        hasAnswer = true;
      }
    });

    if (hasAnswer) return;

    const titleNodes2 = document.querySelectorAll('#quill-2 .ql-editor h2');
    const el2 = document.getElementsByClassName('ql-editor')[1];
    titleNodes2.forEach((t) => {
      if (t.innerText === title) {
        el2.scrollTop = t.offsetTop;
      }
    });
  }

  // readFile = (event) => {
  //   const file = event.target.files[0]; // name, type, size etc
  //   const reader = new FileReader();
  //   const { activeNote } = this.state;
  //
  //   if (file.type.indexOf('text') !== -1) {
  //     reader.readAsText(file);
  //   } else {
  //     reader.readAsDataURL(file);
  //     // reader.readAsArrayBuffer(file);
  //     // FileReader.readAsDataURL() is only good if you are showing the file on browser as the data: URL can only be read by browser
  //   }
  //
  //   reader.onload = (evt) => {
  //     // console.log(evt.target.result); this is the result
  //     FileActions.create({
  //       note: activeNote._id,
  //       title: file.name,
  //       content: evt.target.result,
  //       contentType: file.type,
  //     });
  //   };
  //
  //   reader.onerror = (evt) => {
  //     toastr.error('', 'error reading file');
  //   };
  // }

  render() {
    const {
      quillModules1, quillModules2, isSavingNote, activeNoteContent, activeNoteContent2,
    } = this.state;
    const {
      activeNote,
    } = this.props;

    return (
      <div data-role="note-editor" id="note-editor" className={`${window.isMobile && 'mobile'}`}>
        {activeNote.size > 0
          && (
            <React.Fragment>
              <div
                id="note-editor-title"
                className="flex-horizontal-center padding-5 border-bottom-dark-blue"
              >
                <InputControlledConnected
                  inputName="title"
                  inputClassNames="flex-10 height-30 font-16 border-bottom-black-30 color-black"
                  record={activeNote}
                  actions={this.props.NoteActions}
                />
              </div>

              <div id="note-editor-main" className={`flex-container-row ${isSavingNote && 'border-red'}`}>
                { !window.isMobile
                && (
                  <div id="note-editor-left" className="padding-5 border-right-black">
                    <div id="heading-tags" className="border-green-2px padding-horizontal-5">
                      {activeNote.has('subtitles') && activeNote.get('subtitles').map(subtitle => <div role="menuitem" tabIndex="-1" className="border-bottom-black-20" key={subtitle} value={subtitle} onClick={() => this.scrollToTitle(subtitle)}>{subtitle}</div>)}
                    </div>
                  </div>
                )
                }

                <div className="flex-1 quill-editor" id="quill-1">
                  <CustomToolbar index={1} />
                  <ReactQuill
                    value={activeNoteContent}
                    onChange={value => this.setState({
                      activeNoteContent: value,
                    })}
                    modules={quillModules1}
                    ref={(el) => { this.reactQuillRef = el; }}
                  />
                </div>

                <div className="flex-1 quill-editor" id="quill-2">
                  <CustomToolbar index={2} />
                  <ReactQuill
                    value={activeNoteContent2}
                    onChange={value => this.setState({
                      activeNoteContent2: value,
                    })}
                    modules={quillModules2}
                    ref={(el) => { this.reactQuillRef2 = el; }}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
      </div>
    );
  }
}

// Comment out files for now
// <span className="spacing-5"/>
// <div id="input-file" className="bg-orange">
//   <input type="file" name="datafile" onChange={event => this.readFile(event)}/>
// </div>
//
// {files.valueSeq().map((file, index) =>
//   <div key={index}>
//     <a href={file.href}>
//       {file.title}
//     </a>
//   </div>)}

NoteEditor.defaultProps = {
  activeNote: Map(),
};

NoteEditor.propTypes = {
  // noteTemplates: PropTypes.object.isRequired,
  // files: PropTypes.object.isRequired,
  activeNote: PropTypes.object,

  NoteActions: PropTypes.object.isRequired,
  // FileActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    files: state.files.filter(file => file.getIn(['note', '_id']) === state.ui.getIn(['himalayan', 'activeNoteId'])),
    // noteTemplates: state.notes.filter(note => note.get('isTemplate')),
    activeNote: activeNoteSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    NoteActions: bindActionCreators(NoteActions, dispatch),
    FileActions: bindActionCreators(FileActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
