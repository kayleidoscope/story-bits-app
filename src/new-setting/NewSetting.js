import React, {Component} from 'react';
import dummyData from '../dummyData';
import {Link} from 'react-router-dom';
import './NewSetting.css';

export default class NewSetting extends Component {
    render() {
        const data = dummyData;

        const storyOptions = data.stories.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <section>
                <h2>New setting</h2>
                <p>Enter the info below.</p>
                <form className="new-setting-form">
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story">
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                    <br/>
                    <label htmlFor="title">Name:</label>
                    <input type="text" id="title" name="title" required />
                    <br/>
                    <label htmlFor="description">Short description:</label>
                    <textarea id="description" name="description" required />
                    <br/>
                    <label htmlFor="occupants">Occupants:</label>
                    <textarea id="occupants" name="occupants" />
                    <br/>
                    <label htmlFor="decor">Decor:</label>
                    <textarea id="decor" name="decor" />
                    <br/>
                    <Link to='/home/'>
                        <input type="submit" value="Submit" className="submit-btn"/>
                    </Link>
                </form>
            </section>
        )
    }
}