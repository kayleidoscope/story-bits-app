import React from 'react';
import ReactDOM from 'react-dom';
import EditCharacter from './EditCharacter';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <EditCharacter  match={{params: {charId: "0-0-0"}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
