import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map } from 'immutable';
import { Header } from 'semantic-ui-react';

import { UiActions } from 'utility-redux/ui';
import { CategoryActions, categoriesSortedSelector } from 'utility-redux/category';
import {
  ProjectActions,
  projectsByCategoryIdSelector,
  selectedProjectSelector
} from 'utility-redux/project';

import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';

export class CategoriesList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      categories,
      projectsByCategoryId,
      selectedProject
    } = this.props;

    return (
      <React.Fragment>
        <Header
          as="h2"
          inverted
          content="Category Management"
          subheader="Edit categories and projects"
        />

        <div className="section-content list-with-pinned-bottom">
          <span className="flex-container-row font-400">
            <span className="flex-1 border-right">Color</span>
            <span className="flex-3 border-right">Name</span>
            <span className="flex-1 border-right">Hour</span>
            <span className="flex-1" />
          </span>

          {categories.valueSeq().map(cat => (
            <div key={cat.get('_id')}>
              <div className="flex-container-row border-top-white typical-setup">
                <span className="flex-1" style={{ background: cat.get('color') }}>
                  <Input
                    inputName="color"
                    record={cat}
                    actions={this.props.CategoryActions}
                  />
                </span>

                <Input
                  inputName="name"
                  inputClassNames="flex-3"
                  record={cat}
                  actions={this.props.CategoryActions}
                />

                <span className="flex-2" />
              </div>

              {projectsByCategoryId.get(cat.get('_id')) && projectsByCategoryId.get(cat.get('_id')).valueSeq().map(proj => (
                <div
                  key={proj.get('_id')}
                  className={`flex-container-row typical-setup ${selectedProject.get('_id') === proj.get('_id') && 'bg-orange'}`}
                >
                  <span className="flex-1" />

                  <Input
                    inputName="name"
                    inputClassNames="flex-3"
                    record={proj}
                    actions={this.props.ProjectActions}
                  />

                  <Input
                    inputName="estimatedHour"
                    inputClassNames="flex-1"
                    record={proj}
                    actions={this.props.ProjectActions}
                  />

                  <span className="flex-1">
                    <i
                      role="button"
                      tabIndex="-1"
                      className="fa fa-fw fa-eye"
                      onClick={_ => this.props.UiActions.updateIn(['hourblock', 'planningPage', 'selectedProjectId'], proj.get('_id'))}
                    />
                  </span>
                </div>))}

              <div className="flex-container-row border-top">
                <span className="flex-1">New</span>
                <InputNewConnected
                  inputName="name"
                  inputClassNames="flex-5"
                  newRecord={{ categoryId: cat.get('naturalId') }}
                  actions={this.props.ProjectActions}
                />
              </div>
            </div>))}
        </div>
      </React.Fragment>
    );
  }
}

CategoriesList.defaultProps = {
  selectedProject: Map(),

  categories: Map(),
  projectsByCategoryId: Map(),
};

CategoriesList.propTypes = {
  selectedProject: PropTypes.object,

  categories: PropTypes.object,
  projectsByCategoryId: PropTypes.object,

  CategoryActions: PropTypes.object.isRequired,
  ProjectActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    selectedProject: selectedProjectSelector(state),

    categories: categoriesSortedSelector(state),
    projectsByCategoryId: projectsByCategoryIdSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    ProjectActions: bindActionCreators(ProjectActions, dispatch),

    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
