import React from 'react';
import ReactDOM from 'react-dom';
import StoryItem from './StoryItem';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <StoryItem story="0" />
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
