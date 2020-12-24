import React from 'react';
import ReactDOM from 'react-dom';
import Story from './Story';
import {MemoryRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Story  match={{params: {storyId: "0"}}}/>
      </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
