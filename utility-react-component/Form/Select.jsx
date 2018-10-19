import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { isImmutable } from 'immutable';

// ****  EXAMPLE ***
// <Select
//   onChangeEvent={(event) => {
//     this.props.CalorieActions.update(calorie.set('type', event.target.value))
//   }}
//   value={calorie.get('type')}
//   options={['main', 'addition', 'snack', 'drink']}
// />

export class Select extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  renderOptionItem = (item) => {
    let output = '';
    const { optionContent } = this.props;
    optionContent.forEach((field, index) => {
      output += isImmutable(item) ? item.get(field) : item; // If not immutable it would be just a string

      if (index < optionContent.length - 1) {
        output += ' - ';
      }
    });

    return output;
  }

  render() {
    const {
      selectName, onChangeEvent, value, options, className, optionSortColumn,
    } = this.props;

    return (
      <select
        type="text"
        name={selectName}
        className={className}
        onChange={onChangeEvent}
        value={value}
        style={{ borderLeft: '3px solid white' }}
      >
        <option key="0" value="">
-
          {selectName}
          {' '}
-
          {' '}
        </option>
        {!isImmutable(options) && options.map(item => (
          <option key={item} value={item}>
            {this.renderOptionItem(item)}
          </option>))}

        {isImmutable(options) && options.valueSeq().sort((a, b) => (a.get(optionSortColumn) > b.get(optionSortColumn) ? 1 : -1)).map(item => (
          <option key={item.get('_id')} value={item.get('_id')}>
            {this.renderOptionItem(item)}
          </option>))
        }
      </select>
    );
  }
}

Select.defaultProps = {
  selectName: 'select',
  className: '',
  options: [],
  optionContent: ['name'],
  optionSortColumn: 'name',
  value: '',
  onChangeEvent: () => {},
};

Select.propTypes = {
  selectName: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.any, // Either object or array
  optionContent: PropTypes.array,
  optionSortColumn: PropTypes.string,
  value: PropTypes.string,

  onChangeEvent: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    selectName: ownProps.selectName,
    className: ownProps.className,
    options: ownProps.options,
    optionContent: ownProps.optionContent,
    optionSortColumn: ownProps.optionSortColumn,
    value: ownProps.value,

    onChangeEvent: ownProps.onChangeEvent,
  };
}

export default connect(mapStateToProps)(Select);
