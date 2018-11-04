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
            key={cat.get('_id')}
            style={{
              marginBottom: 5,
              position: 'relative',
              textAlign: 'center'
            }}
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
                // lineHeight: 20,
                boxSizing: 'border-box'
              }}
            >
              {`${cat.get('name')}  `}
              {categoryTotal.get(cat.get('_id')) === undefined ? 0 : categoryTotal.get(cat.get('_id'))}
            </div>

            <div
              style={{
                backgroundColor: cat.get('color'),
                borderLeft: `2px solid ${cat.get('color')}`,
                width: '100%',
                position: 'absolute',
                height: 20,
                zIndex: -1,
                left: 0,
                top: 0,
              }}
            />

            <div
              style={{
                padding: '1px 2px',
                textAlign: 'center',
                margin: '2px 0',
                position: 'relative',
              }}
            >
              {projectsByCategoryId.has(cat.get('_id')) && projectsByCategoryId.get(cat.get('_id')).valueSeq().map(proj => (
                <div
                  key={proj.get('_id')}
                  style={{
                    display: 'flex',
                    position: 'relative',
                    // overflow: 'hidden',
                    height: 15,
                    lineHeight: '15px',
                  }}
                >
                  <span style={{
                    textAlign: 'left',
                    fontSize: 12,
                    flex: 1
                  }}
                  >
                    {`${proj.get('name')}`}
                  </span>

                  <span style={{
                    fontSize: 12,
                    // width: 40,
                    // textAlign: "center"
                  }}
                  >
                    {projectTotal.get(proj.get('_id')) === undefined ? 0 : projectTotal.get(proj.get('_id'))}
                    /
                    {projectPlannedTotal[proj.get('_id')] !== undefined ? projectPlannedTotal[proj.get('_id')] : 0}
                    {/* { proj.get('estimatedHour') } */}
                  </span>


                  {proj.get('estimatedHour') > 0 && projectTotal.has(proj.get('_id')) && projectTotal.get(proj.get('_id')) >= proj.get('estimatedHour')
                    && <i className="fa fa-fw fa-check color-green" />
                  }

                  {proj.get('estimatedHour') > 0
                    && projectTotal.has(proj.get('_id'))
                    && projectTotal.get(proj.get('_id')) < proj.get('estimatedHour')
                    && (
                      <div
                        style={{
                          backgroundColor: cat.get('color'),
                          width: `${(projectTotal.get(proj.get('_id')) / proj.get('estimatedHour')) * 100}%`,
                          position: 'absolute',
                          height: 3,
                          zIndex: -1,
                          left: 0,
                          top: 6,
                        }}
                      />
                    )
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
