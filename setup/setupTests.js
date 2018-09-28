import { configure } from 'enzyme';
import 'babel-polyfill'; // For Sagas test

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Integration test usage
global.confirm = () => true;
global.hljs = {
  configure: jest.fn(),
};

jest.mock('utility-redux/_base/actionCreate');
