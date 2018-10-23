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
// import { UiActions } from 'utility-redux/ui';
// import { UserActions } from 'utility-redux/user';
import './main.scss';

export class AbyssinianPage extends React.Component {
  componentDidMount() {
    ['tc-photo', 'portfolio-ccej', 'portfolio-axa', 'portfolio-imawa', 'testimonial-eric'].forEach((id) => {
      document.getElementById(id).src = require(`./image/${id}.png`); // eslint-disable-line
    });

    // FIXME: without below the forEach seems to be async...
    ['testimonial-tyler', 'testimonial-nate'].forEach((id2) => {
      document.getElementById(id2).src = require(`./image/${id2}.jpg`); // eslint-disable-line
    });
  }

  render() {
    const { pageName } = this.props;

    return (
      <div id="homepage">
        <div id="homepageHeader">
          <div className="title-bar">
            <div id="logo">Tc</div>
          </div>
        </div>

        <div id="homepageMain">
          <div className="homepageSection" id="profile-page">
            <div className="content">
              <img id="tc-photo" alt="presonal photo" width="300" />
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
                  <img id="portfolio-ccej" />
                  <span className="text">@Coke Cola East Japan, my work has been mainly with the further development/maintenance of the existing corporate website. There is also ongoing work at migrating the existing website to a content management service</span>
                  <div className="canvas" />
                </div>
                <div className="portfolio-thumbnail">
                  <img id="portfolio-axa" />
                  <span className="text">@AXA, I was heavily invovled in the development of its customer portal. I was tasked with design work as well as development work. I actively collaborated with a very international team on an offsite basis to ensure the timeline delivery of the product</span>
                  <div className="canvas" />
                </div>
                <div className="portfolio-thumbnail">
                  <img id="portfolio-imawa" />
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
                <img id="testimonial-tyler" alt="#" />
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
                <img id="testimonial-eric" alt="#" />
                <div className="text">
                  <div>Tan is a very smart individual who is truly a full stack developer with strong skillset from even UI / UX, front-end coding to back-end development. He helped us in the launch of klook.com v1.0, offering great insights. DecFisions are well thought-out and made in a timely and logical manner.</div>
                  <div className="spacing" />
                  <div>Most importantly, Tan is very reliable with strong work ethics.  And he's a fun person to have around!</div>
                  <em><a href="http://www.klook.com/">- Eric, Klook Owner. Hongkong, China</a></em>
                </div>
              </div>
              <div className="spacing" />
              <div className="testimonial">
                <img id="testimonial-nate" alt="#" />
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
};

AbyssinianPage.propTypes = {
  // UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbyssinianPage);
