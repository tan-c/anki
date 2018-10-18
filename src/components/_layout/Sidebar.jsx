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
    <Menu.Item as={Link} to="/">
      <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={Link} to="/">
      <Icon name="gamepad" />
        Games
    </Menu.Item>
    <Menu.Item as={Link} to="/anki">
      <Icon name="list" />
        Anki
    </Menu.Item>
    <Menu.Item as={Link} to="/housingPrices">
      <Icon name="building" />
        Toshigo
    </Menu.Item>
  </Sidebar>
);

export default SidebarComponent;
