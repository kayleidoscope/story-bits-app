import React, {Component} from 'react';
import dummyData from '../dummyData';
import {Link} from 'react-router-dom';
import './NewCharacter.css';

export default class NewCharacter extends Component {
    state = {
        story: 0,
    }

    storyChange = (story) => {
        this.setState({
            story
        })
    }

    render() {
        const data = dummyData;

        const storyOptions = data.stories.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        const settingsData = data.settings.filter(setting => setting.story.id === this.state.story)
        const settingsOptions = settingsData.map(setting => {
            return (
                <option key={setting.id} value={setting.id}>{setting.name}</option>
            )
        })

        return (
            <section>
                <h2>New character</h2>
                <p>Enter the info below.</p>
                <form className="new-character-form">
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story" onChange={e => this.storyChange(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                    <br/>
                    <label htmlFor="title">Name:</label>
                    <input type="text" id="name" name="name" required />
                    <br/>
                    <label htmlFor="description">Short description:</label>
                    <textarea id="description" name="description" required />
                    <br/>
                    <label htmlFor="gender">Gender:</label>
                    <input type="text" id="gender" name="gender" />
                    <br/>
                    <label htmlFor="appearance">Physical appearance:</label>
                    <textarea id="appearance" name="appearance" />
                    <br/>
                    <label htmlFor="style">Fashion style:</label>
                    <textarea id="style" name="style" />
                    <br/>
                    <label htmlFor="home">Home:</label>
                    <select name="home" id="home">
                        <option value="0">Not important</option>
                        {settingsOptions}
                    </select>
                    <br/>
                    <label htmlFor="housemates">Housemates:</label>
                    <textarea id="housemates" name="housemates" />
                    <br/>
                    <label htmlFor="decor">Decor:</label>
                    <textarea id="decor" name="decor" />
                    <br/>
                    <Link to="/home/">
                        <input type="submit" value="Submit" className="submit-btn"/>
                    </Link>
                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Cancel
                    </button>
                </form>
     
        </section>
        )
    }
}