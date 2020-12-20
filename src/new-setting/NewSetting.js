import React, {Component} from 'react';
import './NewSetting.css';

export default class extends Component {
    render() {
        return (
            <section>
                <h2>New setting</h2>
                <p>Enter the info below.</p>
                <form className="new-setting-form">
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story">
                        <option value="1">Anne of Green Gables</option>
                        <option value="2">Vampire Diaries</option>
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
                    <input type="submit" value="Submit" className="submit-btn"/>
                </form>
            </section>
        )
    }
}