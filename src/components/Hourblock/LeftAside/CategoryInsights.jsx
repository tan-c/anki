import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { thisWeekMetricsSelector } from 'utility-redux/dailyRecord';
import { categoriesSortedSelector } from 'utility-redux/category';
import { projectsByCategoryIdSelector } from 'utility-redux/project';
import { projectBasedPlannedPomoTotalSelector } from 'utility-redux/plannedPomo';

export class CategoryInsights extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      categories, projectTotal,
      categoryTotal, projectsByCategoryId,
      projectPlannedTotal
    } = this.props;

    return (
      <React.Fragment>
        {categories.valueSeq().map(cat => (
          <div
            className="cat-insight text-center"
            key={cat.get('_id')}
          >
            <div
              className="cat-label" style={{
                margin: '4px 0',
                paddingLeft: 3,
                paddingRight: 3,
                overflow: 'hidden',
                fontSize: 12,
                wordBreak: 'break-all',
                display: 'block',
                boxSizing: 'border-box'
              }}
            >
              {`${cat.get('name')}  `}
              {categoryTotal.get(cat.get('_id')) === undefined ? 0 : categoryTotal.get(cat.get('_id'))}
            </div>
            <div className="cat-prog-bar" style={{ backgroundColor: cat.get('color'), borderLeft: `2px solid ${cat.get('color')}` }} />

            <div className="project-list">
              {projectsByCategoryId.has(cat.get('_id')) && projectsByCategoryId.get(cat.get('_id')).valueSeq().map(proj => (
                <div key={proj.get('_id')}>
                  {proj.get('name')}
                  {' '}
                  -
                  {projectTotal.get(proj.get('_id')) === undefined ? 0 : projectTotal.get(proj.get('_id'))}
                  /
                  {projectPlannedTotal[proj.get('_id')] !== undefined ? projectPlannedTotal[proj.get('_id')] : 0}
                  {/* { proj.get('estimatedHour') } */}

                  {proj.get('estimatedHour') > 0 && projectTotal.has(proj.get('_id')) && projectTotal.get(proj.get('_id')) >= proj.get('estimatedHour')
                    && <i className="fa fa-fw fa-check color-green" />
                  }

                  {proj.get('estimatedHour') > 0
                    && projectTotal.has(proj.get('_id'))
                    && projectTotal.get(proj.get('_id')) < proj.get('estimatedHour')
                    && <div className="proj-prog-bar" style={{ backgroundColor: cat.get('color'), width: `${(projectTotal.get(proj.get('_id')) / proj.get('estimatedHour')) * 100}%` }} />
                  }
                </div>))
              }
            </div>
          </div>))
        }
      </React.Fragment>
    );
  }
}

CategoryInsights.defaultProps = {
  categories: Map(),
  projectsByCategoryId: Map(),

  projectPlannedTotal: Map(),
  projectTotal: Map(),
  categoryTotal: Map(),
};

CategoryInsights.propTypes = {
  categories: PropTypes.object,
  projectsByCategoryId: PropTypes.object,

  projectPlannedTotal: PropTypes.object,
  projectTotal: PropTypes.object,
  categoryTotal: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    categories: categoriesSortedSelector(state),
    projectsByCategoryId: projectsByCategoryIdSelector(state),

    projectPlannedTotal: projectBasedPlannedPomoTotalSelector(state),
    projectTotal: thisWeekMetricsSelector(state)[1],
    categoryTotal: thisWeekMetricsSelector(state)[2],
  };
}

export default connect(mapStateToProps)(CategoryInsights);
