import React from 'react';
import {
  Header, Icon, Image, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => (
  <Sidebar
    as={Menu}
    animation="push"
    icon="labeled"
    inverted
    vertical
    visible
    width="thin"
    style={{
      width: 100
    }}
  >
    <Menu.Item
      as={Link}
      to="/"
      active={location.href.split('//')[1].split('/')[2] === ''}
    >
      <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={Link} to="/">
      <Icon name="gamepad" />
        Games
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/anki"
      active={location.href.indexOf('/anki') > -1}
    >
      <Icon name="list" />
        Anki
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/housingPrices"
      active={location.href.indexOf('/housingPrices') > -1}
    >
      <Icon name="building" />
        Toshigo
    </Menu.Item>
  </Sidebar>
);

export default SidebarComponent;
