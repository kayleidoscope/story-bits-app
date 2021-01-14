import React from 'react';
import ReactDOM from 'react-dom';
import CannotAccess from './CannotAccess';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <CannotAccess />
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
