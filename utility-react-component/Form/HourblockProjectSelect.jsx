import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { projectsByCategoryNameSelector } from 'utility-redux/project';

export class ProjectSelect extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  render() {
    const {
      projectsByCategoryName,
      onChangeEvent, value, color, className,
    } = this.props;

    return (
      <select
        type="text"
        name="project"
        className={className}
        onChange={onChangeEvent}
        value={value}
        style={{ borderLeft: `5px solid ${color}` }}
      >
        <option value="" />
        {projectsByCategoryName.keySeq().map(categoryName => (
          <optgroup key={categoryName} label={categoryName}>
            {projectsByCategoryName.get(categoryName).valueSeq().map(project => (
              <option key={project.get('_id')} value={`${project.get('_id')}`}>
                {project.get('name')}
              </option>))}
          </optgroup>
        ))}

      </select>
    );
  }
}

ProjectSelect.defaultProps = {
  projectsByCategoryName: Map(),
  // sortedProjectList: Map(),
  className: '',
  value: '',
  color: 'transparent',
  onChangeEvent: () => { },
};

ProjectSelect.propTypes = {
  projectsByCategoryName: PropTypes.object,
  // sortedProjectList: PropTypes.object,
  value: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  onChangeEvent: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    projectsByCategoryName: projectsByCategoryNameSelector(state),
    // sortedProjectList: projectsByIdSortedSelector(state),
    className: ownProps.className,
    value: ownProps.value,
    color: ownProps.color,
    onChangeEvent: ownProps.onChangeEvent,
  };
}

export default connect(mapStateToProps)(ProjectSelect);
