import React, {Component} from 'react';
import './NewCharacter.css';

export default class NewCharacter extends Component {
    render() {
        return (
            <section>
                <h2>New character</h2>
                <p>Enter the info below.</p>
                <form className="new-character-form">
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story">
                        <option value="1">Anne of Green Gables</option>
                        <option value="2">Vampire Diaries</option>
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
                        <option value="1">Green Gables</option>
                        <option value="2">Diana's house</option>
                    </select>
                    <br/>
                    <label htmlFor="housemates">Housemates:</label>
                    <textarea id="housemates" name="housemates" />
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