import { configure } from 'enzyme';
import Adaptar from 'enzyme-adapter-react-16';

configure({ adapter: new Adaptar() });

import '@testing-library/jest-dom';
// import fetchMock from 'jest-fetch-mock';

// fetchMock.enableMocks();
