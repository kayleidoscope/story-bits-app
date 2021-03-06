import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <MemoryRouter>
      <SignUp />
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
