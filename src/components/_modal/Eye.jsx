import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

export class ModalEye extends React.Component {
  state = {
    currentTime: new Date(),
  }

  componentDidMount() {
    this.updateTimeRunner = setInterval(() => {
      this.setState({
        currentTime: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeRunner);
  }

  render() {
    const { currentTime } = this.state;
    return (
      <React.Fragment>
        {currentTime.getMinutes() % 30 >= 28
          && (
            <div id="modal-eye" data-role="modal-eye">
              <div id="current-time">
                {currentTime.toString()}
              </div>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}

ModalEye.defaultProps = {
};

ModalEye.propTypes = {
  // currentTime: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // currentTime: ownProps.currentTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEye);
