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
      width: 90
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
    <Menu.Item
      as={Link}
      to="/ankiLearn"
      active={location.href.split('//')[1].split('/')[2] === 'ankiLearn'}
    >
      <Icon name="university" />
      Learn
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/anki"
      active={location.href.split('//')[1].split('/')[2] === 'anki'}
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
