import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NewStory.css';

export default class NewStory extends Component {
    handleClickCancel = () => {
        this.props.history.push('/home/')
    }

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
                    <Link to='/home/'>
                        <input type="submit" value="Submit" className="submit-btn"/>
                    </Link>
                    <button type='button' onClick={this.handleClickCancel}  className="submit-btn">
                        Cancel
                    </button>
                </form>
            </section>
        )
    }
}