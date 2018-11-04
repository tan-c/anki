import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, isImmutable } from 'immutable';
import moment from 'moment-timezone';

import {
  Grid, Header, List, Label
} from 'semantic-ui-react';

import {
  TaskActions,
  projectTasksSelector,
} from 'utility-redux/task';
import { todayPlannedPomosSelector } from 'utility-redux/plannedPomo';
import { UiActions } from 'utility-redux/ui';
import ProjectTasksListConnected from './ProjectTasksList';

export class ProjectTaskList extends React.Component {
  state = {
    nextPomo: Map(),
  }
  // constructor(props, context) {
  //   super(props, context);
  // }
  //


  componentDidMount() {
    setInterval(() => {
      this.getNextPomo(this.props.todayPlannedPomos);
    }, 1000 * 60 * 10);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.nextPomo.size) {
      this.getNextPomo(nextProps.todayPlannedPomos);
    }
  }

  getNextPomo = (todayPlannedPomos) => {
    const currentSectionOfDay = moment().tz('Asia/Tokyo').hour() * 2 + parseInt(moment().minute() / 30, 10);
    const nextSectionOfDay = (currentSectionOfDay + 1) % 48; // 1-indexed
    const nextPomo = todayPlannedPomos.hasIn(['plannedPomos', nextSectionOfDay]) ? todayPlannedPomos.getIn(['plannedPomos', nextSectionOfDay]) : Map();

    this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'focusedProjectId'], nextPomo.getIn(['project', '_id']));
    this.setState({ nextPomo });
  }

  updateTask = (event, task) => {
    if (event.which === 13) {
      const { value } = event.target;
      this.props.TaskActions.update(task.set('content', value), task);
    }
  }

  render() {
    const {
      projectTasks,
      focusedProjectId,
      projects,
    } = this.props;

    const { nextPomo } = this.state;

    return (
      <Grid.Row
        style={{
          height: '100%'
        }}
      >
        <Grid.Column
          width={6}
          style={{
            overflow: 'auto'
          }}
        >
          <Header
            as="h3"
            inverted
          >
            Project Tasks
          </Header>

          <List
            inverted
            divided
            selection
            verticalAlign="middle"
          >
            {projects.valueSeq().sort((a, b) => a.getIn(['category', 'naturalId']) - b.getIn(['category', 'naturalId'])).map(project => (
              <List.Item
                key={project.get('_id')}
                className={`${focusedProjectId === project.get('_id') && 'border-orange'} ${nextPomo.getIn(['project', '_id']) === project.get('_id') && 'bg-orange'}`}
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'focusedProjectId'], project.get('_id'))}
              >
                <Label
                  style={{
                    width: 80,
                    overflow: 'hidden',
                    backgroundColor: project.getIn(['category', 'color']),
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {project.get('name')}
                </Label>

                {projectTasks.has(project.get('_id')) && projectTasks.get(project.get('_id')).sort((a, b) => b.get('priority') - a.get('priority')).getIn([0, 'content'])}

                <List.Content floated="right">
                  {/* List sum of estimated time for this project */}
                  {!projectTasks.has(project.get('_id')) && 0}
                  {projectTasks.has(project.get('_id')) && projectTasks.get(project.get('_id')).size === 1 && projectTasks.getIn([project.get('_id'), '0', 'subTasks']).count() / 2}
                  {projectTasks.has(project.get('_id')) && projectTasks.get(project.get('_id')).size > 1 && projectTasks.get(project.get('_id')).reduce((currentSum, b) => (isImmutable(currentSum) ? currentSum.get('subTasks').count() : currentSum) + b.get('subTasks').count()) / 2}
                  {'H'}
                </List.Content>
              </List.Item>))}
          </List>
        </Grid.Column>

        <Grid.Column
          width={10}
          style={{
            overflow: 'auto'
          }}
        >
          <ProjectTasksListConnected />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

ProjectTaskList.defaultProps = {
  projectTasks: Map(),
  projects: Map(),
  todayPlannedPomos: Map(),
  focusedProjectId: '',
};

ProjectTaskList.propTypes = {
  projectTasks: PropTypes.object,
  projects: PropTypes.object,
  todayPlannedPomos: PropTypes.object,
  focusedProjectId: PropTypes.string,

  TaskActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    focusedProjectId: state.ui.getIn(['hourblock', 'hourblockPage', 'focusedProjectId']),
    projectTasks: projectTasksSelector(state),
    todayPlannedPomos: todayPlannedPomosSelector(state),
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTaskList);
