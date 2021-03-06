import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import NewCharacter from './NewCharacter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <NewCharacter />
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
