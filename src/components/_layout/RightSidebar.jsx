import React from 'react';
import {
  Header,
  Icon, Menu, Sidebar,
  Input,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => (
  <Sidebar
    as={Menu}
    animation="overlay"
    direction="right"
    inverted
    vertical
    visible
    width="thin"
    style={{
      // width: 140,
    }}
  >
    <Menu.Item>
      <Image
        src="/logo-white-long.png"
        size="small"
      />
    </Menu.Item>

    <Menu.Item
      as={Link}
      to="/"
      active={location.href.split('//')[1].split('/')[2] === ''}
    >
      <Icon name="home" />
      Home
    </Menu.Item>

    <Menu.Item
      as={Link}
      to="/hourblock"
      active={location.href.indexOf('/hourblock') > -1}
    >
      <Icon name="calendar" />
      Hourblock
    </Menu.Item>

    <Menu.Item
      as={Link}
      to="/notes"
      active={location.href.indexOf('/notes') > -1}
    >
      <Icon name="sticky note outline" />
      IntelNote
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
