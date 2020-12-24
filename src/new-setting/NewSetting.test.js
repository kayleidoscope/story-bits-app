import React from 'react';
import ReactDOM from 'react-dom';
import NewSetting from './NewSetting';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <NewSetting match={{params: {settingId: "0-0"}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
