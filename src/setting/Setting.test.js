import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './Setting';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Setting  match={{params: {settingId: "0-0"}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
