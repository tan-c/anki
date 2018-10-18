import React from 'react';
import {
  Header, Icon, Image, Menu, Segment, Sidebar
} from 'semantic-ui-react';

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
    <Menu.Item as="a">
      <Icon name="home" />
        Home
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="gamepad" />
        Games
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="camera" />
        Channels
    </Menu.Item>
  </Sidebar>
);

export default SidebarComponent;
