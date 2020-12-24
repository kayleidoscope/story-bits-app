import React from 'react';
import ReactDOM from 'react-dom';
import Setting from './Setting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Setting />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
