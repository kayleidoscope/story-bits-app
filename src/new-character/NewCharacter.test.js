import React from 'react';
import ReactDOM from 'react-dom';
import NewCharacter from './NewCharacter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <NewCharacter />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
