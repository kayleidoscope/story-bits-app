import React from 'react';
import ReactDOM from 'react-dom';
import EditSetting from './EditSetting';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <EditSetting   match={{params: {settingId: 1}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
