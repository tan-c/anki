import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// ** EXAMPLE
// <InputNew
//   inputName="content"
//   inputClassNames="flex-3"
//   newRecord={{
//     targetCompletion: dayVal.dayMomentObject.toDate(),
//     type: 'daily',
//   }}
//   actions={this.props.TaskActions}
// />

export class InputNew extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  onKeyDown = (event) => {
    if (event.which === 13) {
      const { newRecord, actions } = this.props;
      const { value, name } = event.target;
      // Note this record is of object type

      if (name !== 'inputNamePlaceholder') {
        newRecord[name] = value;
      }
      actions.create(newRecord).then((_) => {
        this.ref.value = '';
      });
    }
  }

  render() {
    const {
      inputName, inputClassNames, placeholderContent,
    } = this.props;

    return (
      <input
        type="text"
        name={inputName}
        className={inputClassNames}
        ref={(ref) => { this.ref = ref; }}
        placeholder={placeholderContent}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}

InputNew.defaultProps = {
  inputName: 'inputNamePlaceholder',
  inputClassNames: 'flex-1',
  newRecord: {},
  placeholderContent: 'add new',
  actions: {},
};

InputNew.propTypes = {
  inputClassNames: PropTypes.string,
  placeholderContent: PropTypes.string,
  newRecord: PropTypes.object,

  inputName: PropTypes.string,
  actions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    inputName: ownProps.inputName,
    inputClassNames: ownProps.inputClassNames,
    newRecord: ownProps.newRecord,
    actions: ownProps.actions,
    placeholderContent: ownProps.placeholderContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputNew);
