import React, {Component} from 'react';
import dummyData from '../dummyData';
import {Link} from 'react-router-dom';
import './Home.css';

/* Somewhere down this line, this should probably be broken up into more components. */

export default class Home extends Component {
    render () {
        const data = dummyData.stories;

        const simpleStoryLIs = data.map(story => {
            return (
                <li key={story.id} className="home-story">
                <Link to={`/story/${story.id}`}>
                    <h4>{story.title}</h4>
                </Link>
                <p>{story.description}</p>
                </li>
            )
        })

        return (
            <div className="home">
                <h2>Welcome, username!</h2>
                <p>A random quote generator will put a quote here.</p>
                <Link to='/stories/'>
                    <h3>My stories</h3>
                </Link>
                <Link to="/new/story">
                    <button>
                        New story
                    </button>
                </Link>
                <ul>
                    {simpleStoryLIs}
                </ul>
            </div>
        )
    }
}