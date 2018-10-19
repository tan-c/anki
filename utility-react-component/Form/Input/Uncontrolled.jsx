import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import toastr from 'toastr';

export class InputUncontrolled extends React.Component {
  render() {
    const {
      inputName, record, actions, inputClassNames, pathName,
    } = this.props;
    return (
      <input
        type="text"
        name={inputName}
        className={inputClassNames}
        ref={(ref) => { this.ref = ref; }}
        placeholder={pathName.length ? record.getIn(pathName) : record.get(inputName)}
        onKeyDown={(event) => {
          if (event.which === 13) {
            const { value, name } = event.target;
            const newRecord = pathName.length ? record.setIn(pathName, value) : record.set(name, value);
            actions.update(newRecord).then((_) => {
              toastr.success(`${inputName} Updated successfully`);
              this.ref.value = '';
            });
          }
        }}
      />
    );
  }
}

InputUncontrolled.defaultProps = {
  pathName: [],
  inputClassNames: 'flex-1',
  inputName: '',
  record: Map(),
  actions: {},
};

InputUncontrolled.propTypes = {
  pathName: PropTypes.array,
  inputClassNames: PropTypes.string,
  inputName: PropTypes.string,
  record: PropTypes.object,
  actions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    pathName: ownProps.pathName,
    inputName: ownProps.inputName,
    inputClassNames: ownProps.inputClassNames,
    record: ownProps.record,
    actions: ownProps.actions,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

export default connect(mapStateToProps)(InputUncontrolled);
