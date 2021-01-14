import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <AppWrapper />
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
