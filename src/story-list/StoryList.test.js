import React from 'react';
import ReactDOM from 'react-dom';
import StoryList from './StoryList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <StoryList story="0" />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
