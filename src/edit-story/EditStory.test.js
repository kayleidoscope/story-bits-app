import React from 'react';
import ReactDOM from 'react-dom';
import EditStory from './EditStory';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <EditStory   match={{params: {storyId: 1}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
