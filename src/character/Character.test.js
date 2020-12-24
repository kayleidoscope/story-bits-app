import React from 'react';
import ReactDOM from 'react-dom';
import Character from './Character';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Character   match={{params: {charId: "0-0-0"}}}/>
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
