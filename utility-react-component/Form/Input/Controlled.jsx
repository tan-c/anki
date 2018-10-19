import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import withOnKeyDown from '../hoc/withOnKeyDown';

export class InputControlled extends React.Component {
  render() {
    const {
      inputName, inputClassNames, onChange, onKeyDown, inputValue,
    } = this.props;

    return (
      <input
        type="text"
        name={inputName}
        className={inputClassNames}
        ref={(ref) => { this.ref = ref; }}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
}

InputControlled.defaultProps = {
  inputClassNames: 'flex-1',
  inputName: '',
  inputValue: '',
  onKeyDown: () => {},
  onChange: () => {},
};

InputControlled.propTypes = {
  inputClassNames: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    textareaRow: ownProps.textareaRow,
    inputType: ownProps.inputType,
    inputName: ownProps.inputName,
    inputClassNames: ownProps.inputClassNames,
    record: ownProps.record,
  };
}

export default withOnKeyDown(connect(mapStateToProps)(InputControlled), false);
