import React from 'react';
import ReactDOM from 'react-dom';
import NewStory from './NewStory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <NewStory />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
