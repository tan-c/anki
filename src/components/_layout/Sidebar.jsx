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
    animation="push"
    inverted
    vertical
    visible
    width="thin"
    style={{
      width: 140,
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
      active={location.href.split('//')[1].split('/')[2] === 'anki'}
    >
      <Icon name="university" />
      Anki
      <Menu.Menu>
        <Menu.Item
          as={Link}
          to="/anki"
          active={location.href.split('//')[1].split('/')[2] === 'anki'}
        >
          Anki List
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/ankiLearn"
          active={location.href.split('//')[1].split('/')[2] === 'ankiLearn'}
        >
          Anki Learn
        </Menu.Item>
      </Menu.Menu>
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
