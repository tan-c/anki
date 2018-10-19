// eslintignore react/no-set-state
import toastr from 'toastr';
import PropTypes from 'prop-types';
import React from 'react';

const withOnKeyDown = (WrappedComponent, needMetaKey) => {
  class WithOnKeyDownComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: '',
      };
    }

    componentWillMount() {
      const {
        inputName, record,
      } = this.props;
      this.updateInputValue(inputName, record);
    }

    componentWillReceiveProps(nextProps) {
      const {
        inputName, record,
      } = nextProps;
      this.updateInputValue(inputName, record);
    }

    onChange = (event) => {
      this.setState({
        inputValue: event.target.value,
      });
    }

    onKeyDown = (event, callback = null) => {
      if (event.which === 13) {
        if (needMetaKey && !event.metaKey) {
          return;
        }

        const { actions, inputName, record } = this.props;
        const { inputValue } = this.state;
        const { value, name } = event.target;

        // FIXME: passing in original record as 2nd parameter only for TaskActions
        actions.update(record.set(name, inputValue), record).then((_) => {
          toastr.success(`${inputName} Updated successfully`);

          if (callback !== null) {
            callback();
          }
        });
      }
    }

    updateInputValue = (inputName, record) => {
      if (record.has(inputName)) {
        this.setState({
          inputValue: record.get(inputName),
        });
      }
    }

    render() {
      const { inputValue } = this.state;

      return (
        <WrappedComponent
          {... this.props}
          inputValue={inputValue}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      );
    }
  }

  WithOnKeyDownComponent.propTypes = {
    inputName: PropTypes.string.isRequired,
    record: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  return WithOnKeyDownComponent;
};

export default withOnKeyDown;
