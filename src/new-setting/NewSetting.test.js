import React from 'react';
import ReactDOM from 'react-dom';
import NewSetting from './NewSetting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <NewSetting />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
