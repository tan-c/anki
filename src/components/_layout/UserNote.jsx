import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Form, TextArea } from 'semantic-ui-react';

import { UserActions, currentUserSelector } from 'utility-redux/common/user';

require('./UserNote.scss');

export class Note extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }
  state = {
    inputValue: '',
    updating: false,
  };

  componentWillMount() {
    this.updateInputValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateInputValue(nextProps);
  }

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onKeyDown = (event) => {
    if (event.which === 13) {
      if (!event.metaKey) {
        return;
      }

      this.setState({
        updating: true
      });
      const { currentUser, field } = this.props;
      const { inputValue } = this.state;

      this.props.UserActions.update(currentUser.set(field, inputValue)).then((_) => {
        // toastr.success(`${field} Field Updated successfully`);
        this.setState({
          updating: false
        });
      });
    }
  }

  updateInputValue = (props) => {
    const { currentUser, field } = props;
    if (currentUser.has(field)) {
      this.setState({
        inputValue: currentUser.get(field),
      });
    }
  }

  render() {
    const { currentUser, field } = this.props;
    const { inputValue, updating } = this.state;

    return (
      <Form style={{ height: '100vh' }}>
        <div
          style={{
            backgroundColor: 'red',
            color: 'white',
            position: 'absolute',
            right: 5,
            top: 10,
            zIndex: 1111
          }}
        >
          {`Size: ${currentUser.has(field) ? currentUser.get(field).length : 0}`}
        </div>

        <TextArea
          type="text"
          style={{
            height: '100%',
            background: updating ? 'teal' : 'white',
          }}
          name={field}
          disabled={updating}
          ref={(ref) => { this.ref = ref; }}
          value={inputValue}
          onChange={this.onChange}
          onKeyDown={event => this.onKeyDown(event)}
        />
      </Form>
    );
  }
}

Note.defaultProps = {
  currentUser: Map(),
};

Note.propTypes = {
  currentUser: PropTypes.object,
  field: PropTypes.string.isRequired,

  UserActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    field: ownProps.field,
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Note);
