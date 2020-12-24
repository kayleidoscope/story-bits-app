import React from 'react';
import ReactDOM from 'react-dom';
import StoryList from './StoryList';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <StoryList story="0" />
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
