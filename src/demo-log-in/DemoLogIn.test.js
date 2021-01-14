import React from 'react';
import ReactDOM from 'react-dom';
import DemoLogIn from './DemoLogIn';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <DemoLogIn />
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
