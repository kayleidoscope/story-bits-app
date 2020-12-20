import React from 'react';
import ReactDOM from 'react-dom';
import Compare from './Compare';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Compare />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
