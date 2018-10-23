import React from 'react';
import {
  Button, Form, Grid, Header, Segment
} from 'semantic-ui-react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// import { bindActionCreators } from 'redux';
import {
  connect
} from 'react-redux';

// import { loadavg } from 'os';
import { UiActions } from 'utility-redux/ui';
import { UserActions } from 'utility-redux/user';

export class LoginPage extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }
  state = {
    email: '',
    password: ''
  }

  login = () => {
    const { email, password } = this.state;

    this.props.UserActions.create({
      email,
      password,
    }).then((res) => {
      if (res && res._id !== null) {
        localStorage.setItem('access_token', res.newToken);
        localStorage.setItem('expires_at', res.expiresAt);

        toastr.info('Localstorage set');
        // Re-subscribe the user
        // toastr.info('Re-subscribing user after login');
        // subscribeUser(true);

        this.props.loggedIn(res);
      } else {
        toastr.error('No valid user');
      }
    });
  }

  render() {
    const { pageName } = this.props;

    return (
      <div className="login-form">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {/* <Image src="/logo.png" /> */}
              {`Log In To ${pageName}`}
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  id="login-email"
                  fluid
                  icon="user"
                  iconPosition="left" placeholder="E-mail address"
                  onChange={event => this.setState({
                    email: event.target.value
                  })}
                />

                <Form.Input
                  fluid
                  id="login-password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={event => this.setState({
                    password: event.target.value
                  })}
                />

                <Button
                  color="teal"
                  id="login-button"
                  fluid
                  size="large"
                  onClick={this.login}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {/* <Message>
              New to us?
              {' '}
              <a href="#">Sign Up</a>
            </Message> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  pageName: ''
};

LoginPage.propTypes = {
  pageName: PropTypes.string,

  UserActions: PropTypes.object.isRequired,
  // UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    pageName: ownProps.pageName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loggedIn: currentUser => dispatch({
      type: 'SET_CURRENT_USER',
      currentUser
    }),
    UserActions: bindActionCreators(UserActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
