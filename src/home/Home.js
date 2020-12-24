import React, {Component} from 'react';
import StoryList from '../story-list/StoryList';
import './Home.css';

/* Somewhere down this line, this should probably be broken up into more components. */

export default class Home extends Component {
    render () {
        return (
            <div className="home">
                <h2>My Stories</h2>
                <StoryList />
            </div>
        )
    }
}