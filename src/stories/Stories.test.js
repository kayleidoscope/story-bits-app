import React from 'react';
import ReactDOM from 'react-dom';
import Stories from './Stories';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Stories />
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
