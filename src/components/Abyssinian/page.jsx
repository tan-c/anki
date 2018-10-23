import React from 'react';

import toastr from 'toastr';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  Button, Form, Grid, Header, Segment
} from 'semantic-ui-react';

// import { bindActionCreators } from 'redux';
import {
  connect
} from 'react-redux';

// import { loadavg } from 'os';
import { UiActions } from 'utility-redux/ui';
import { UserActions } from 'utility-redux/user';

import './main.scss';

import LoginPageConnected from './LoginPage';

export class AbyssinianPage extends React.Component {
  componentDidMount() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() < expiresAt * 1000) {
      this.relogin(localStorage.getItem('access_token'));
    }
  }

  relogin = (token) => {
    this.props.UserActions.create({
      token,
    }).then((res) => {
      if (res && res._id !== null) {
        toastr.info('Successfully re-loggedin');
        this.props.loggedIn(res);
      } else {
        toastr.error('No valid user');
      }
    });
  }

  render() {
    const { isShowingLoginPage } = this.props;

    if (isShowingLoginPage) {
      return (<LoginPageConnected pageName="Anki" />);
    }

    return (
      <div id="homepage">
        <div id="homepageHeader">
          <div className="title-bar">
            <div id="logo">Tc</div>
          </div>
        </div>

        <Button
          basic
          content="Login"
          style={{
            position: 'absolute',
            right: 0,
            color: 'white'
          }}
          onClick={
            (_) => {
              this.props.UiActions.updateIn(['isShowingLoginPage'], true);
            }
          }
        />

        <div id="homepageMain">
          <div className="homepageSection" id="profile-page">
            <div className="content">
              <img
                id="tc-photo"
                alt="personal"
                width="300"
                src="/abyssinian/tc-photo.png"
              />

              <div id="profile-text">
                <h1 className="font-600">TAN CHEN</h1>
                <hr />
                <span className="spacing" />
                <span className="spacing" />
                <strong className="subtitle font-600">&lt;coder&gt;</strong>
                <p>
                  Full-stack web app developer, focusing on Single Page Application on MEAN stack.
                  <br />
                  {' '}
                  Experience in building scalable solutions.
                </p>
                <span className="spacing" />
                <span className="spacing" />
                <span className="spacing" />
                <span className="spacing" />
                <div className="subtitle fancy-font">UI/UX　Ninja</div>
                <p>
                  With a passion for clean and functional sites and user interfaces.
                  <br />
                  {' '}
                  Shinja of "less is more".
                </p>
              </div>
            </div>
          </div>

          <div className="homepageSection highlight" id="portfolio-page">
            <div className="content">
              <div className="section-title">PORTFOLIO</div>
              <div className="section-divider">
                <div className="divider-left" />
                <i className="fa fa-fw fa-folder-open-o section-icon" />
                <div className="divider-right" />
              </div>
              <div className="spacing" />
              <div className="spacing" />
              <div id="portfolio-thumbnails">
                <div className="portfolio-thumbnail">
                  <img id="portfolio-ccej" src="/abyssinian/portfolio-ccej.png" />
                  <span className="text">@Coke Cola East Japan, my work has been mainly with the further development/maintenance of the existing corporate website. There is also ongoing work at migrating the existing website to a content management service</span>
                  <div className="canvas" />
                </div>
                <div className="portfolio-thumbnail">
                  <img id="portfolio-axa" src="/abyssinian/portfolio-axa.png" />
                  <span className="text">@AXA, I was heavily invovled in the development of its customer portal. I was tasked with design work as well as development work. I actively collaborated with a very international team on an offsite basis to ensure the timeline delivery of the product</span>
                  <div className="canvas" />
                </div>
                <div className="portfolio-thumbnail">
                  <img id="portfolio-imawa" src="/abyssinian/portfolio-imawa.png" />
                  <span className="text">Imawa is a IOS app that promotes spontaneous hangout uniquely presented by TAN Chen. Stayed tuned for exciting updates</span>
                  <div className="canvas" />
                </div>
                {/* <div className="portfolio-thumbnail">
                  <span className="subtitle">Allmenz</span>
                  <span className="text">Imawa is a IOS app that promotes spontaneous hangout uniquely presented by TAN Chen. Stayed tuned for exciting updates</span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="homepageSection" id="testimonial-page">
            <div className="content">
              <div className="section-title">TESTIMONIAL</div>
              <div className="section-divider">
                <div className="divider-left" />
                <i className="fa fa-fw fa-comments-o section-icon" />
                <div className="divider-right" />
              </div>
              <div className="spacing" />
              <div className="spacing" />
              <div className="testimonial">
                <img id="testimonial-tyler" alt="#" src="/abyssinian/testimonial-tyler.jpg" />
                <div className="text">
                  <div>Tan is a versatile, flexible and fast developer that has consistently delivered quality code to our team for complex and demanding projects. Tan is not only a talented developer well-informed on the latest tech, but a great guy to work with; both friendly and a team player.</div>
                  <div className="spacing" />
                  <div>We would not hesitate to recommend Tan, and hope to have the chance to work together again in the future.</div>
                  <em>
                    <a href="http://www.tsunago.net/">
                      - Tyler Harder, CEO @
                Tsunago. Tokyo, Japan
                    </a>
                  </em>
                </div>
              </div>

              <div className="spacing" />

              <div className="testimonial">
                <img
                  id="testimonial-eric"
                  alt="#"
                  src="/abyssinian/testimonial-eric.png"
                />
                <div className="text">
                  <div>Tan is a very smart individual who is truly a full stack developer with strong skillset from even UI / UX, front-end coding to back-end development. He helped us in the launch of klook.com v1.0, offering great insights. DecFisions are well thought-out and made in a timely and logical manner.</div>
                  <div className="spacing" />
                  <div>Most importantly, Tan is very reliable with strong work ethics.  And he's a fun person to have around!</div>
                  <em><a href="http://www.klook.com/">- Eric, Klook Owner. Hongkong, China</a></em>
                </div>
              </div>

              <div className="spacing" />

              <div className="testimonial">
                <img
                  id="testimonial-nate"
                  alt="#"
                  src="/abyssinian/testimonial-nate.jpg"
                />
                <div className="text">
                  <div>With Tan, he responds quickly, his communication skills are good, he has high technical skill, and he offers up solutions or ideas that might work better or benefit the client. All of these show me he is self-motivated and enthusiastic: something hard to find in a freelancer.</div>
                  <div className="spacing" />
                  <div>Should you hire Tan? No. Because we need him =)</div>
                  <em><a href="http://www.humblebunny.com/">- Nathan Hoernig, Humble Bunny Owner. Tokyo, Japan</a></em>
                </div>
              </div>
            </div>
          </div>

          <div id="homepageFooter">
            <span>
              <a href="#">2016-2018 Tc</a>
            </span>
            <span>
              <a className="link" href="mailto:tanchen2014@gmail.com?Subject=Inquiries" target="_top">tanchen2014@gmail.com</a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/tan-chen-b3519447" target="_blank">
                <i className="fa fa-fw fa-linkedin-square" />
              </a>
            </span>
          </div>
        </div>
        <div id="homepageCover" />
      </div>
    );
  }
}

AbyssinianPage.defaultProps = {
  isShowingLoginPage: false,
};

AbyssinianPage.propTypes = {
  isShowingLoginPage: PropTypes.bool,
  // UiActions: PropTypes.object.isRequired
  UiActions: PropTypes.object.isRequired,
  UserActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isShowingLoginPage: state.ui.getIn(['isShowingLoginPage']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loggedIn: currentUser => dispatch({
      type: 'SET_CURRENT_USER',
      currentUser
    }),
    UserActions: bindActionCreators(UserActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbyssinianPage);
