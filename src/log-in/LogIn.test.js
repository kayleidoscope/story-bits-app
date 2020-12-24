import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './LogIn';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <LogIn />
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
