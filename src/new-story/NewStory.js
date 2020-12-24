import React, {Component} from 'react';
import './NewStory.css';

export default class NewStory extends Component {
    render() {
        return (
            <section className="new-story">
                <h2>New story</h2>
                <p>Enter the info below.</p>
                <form className="new-story-form">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                    <br/>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required />
                    <br/>
                    <input type="submit" value="Submit" className="submit-btn"/>
                </form>
            </section>
        )
    }
}