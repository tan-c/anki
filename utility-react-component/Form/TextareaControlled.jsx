import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import toastr from 'toastr';
import withOnKeyDown from './hoc/withOnKeyDown';

export class TextareaControlled extends React.Component {
  render() {
    const {
      inputName, inputClassNames, textareaRow, onChange, onKeyDown, inputValue, callback,
    } = this.props;

    return (
      <textarea
        type="text"
        name={inputName}
        rows={textareaRow}
        className={inputClassNames}
        ref={(ref) => { this.ref = ref; }}
        value={inputValue}
        onChange={onChange}
        onKeyDown={event => onKeyDown(event, callback)}
      />
    );
  }
}

TextareaControlled.defaultProps = {
  callback: null,
  textareaRow: 2,
  inputClassNames: 'flex-1',
  inputValue: '',
  inputName: '',
  onKeyDown: () => {},
  onChange: () => {},
};

TextareaControlled.propTypes = {
  callback: PropTypes.func,
  textareaRow: PropTypes.number,
  inputClassNames: PropTypes.string,
  inputValue: PropTypes.string,
  inputName: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    textareaRow: ownProps.textareaRow,
    inputName: ownProps.inputName,
    inputClassNames: ownProps.inputClassNames,
  };
}

export default withOnKeyDown(connect(mapStateToProps)(TextareaControlled), true);
