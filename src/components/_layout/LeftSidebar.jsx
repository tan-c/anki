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
      active={location.href.split('//')[1].split('/')[2] === 'hourblock'}
    >
      <Icon name="calendar" />
      Hourblock

      <Menu.Menu>
        <Menu.Item
          as={Link}
          to="/hourblock"
          active={location.href.split('//')[1].split('/')[2] === 'hourblock' && location.href.split('//')[1].split('/')[3] === undefined}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/hourblock/planning"
          active={location.href.split('//')[1].split('/')[2] === 'hourblock' && location.href.split('//')[1].split('/')[3] === 'planning'}
        >
          Planning
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/hourblock/tasks"
          active={location.href.split('//')[1].split('/')[2] === 'hourblock' && location.href.split('//')[1].split('/')[3] === 'tasks'}
        >
          Tasks
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/hourblock/settings"
          active={location.href.split('//')[1].split('/')[2] === 'ankiList' && location.href.split('//')[1].split('/')[3] === 'settings'}
        >
          Settings
        </Menu.Item>
      </Menu.Menu>
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
          to="/ankiList"
          active={location.href.split('//')[1].split('/')[2] === 'ankiList'}
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
        <Menu.Item
          as={Link}
          to="/ankiTag"
          active={location.href.split('//')[1].split('/')[2] === 'ankiTag'}
        >
          Anki Tag
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
