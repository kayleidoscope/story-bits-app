import React from 'react';
import ReactDOM from 'react-dom';
import StoryItem from './StoryItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <StoryItem story="0" />,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
