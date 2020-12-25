import React, {Component} from 'react';
import StoryList from '../story-list/StoryList';
import {Link} from 'react-router-dom';
import './Stories.css';

export default class Home extends Component {
    render () {
        return (
            <div className="stories">
                <h2>My Stories</h2>
                <Link to="/new/story">
                    <button>
                        New story
                    </button>
                </Link>
                <StoryList />
            </div>
        )
    }
}